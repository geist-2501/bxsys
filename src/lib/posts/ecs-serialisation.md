---
title: ECS and serialisation.
date: 5/07/23
description: One main attraction for the Entity Component System framework is that it keeps concerns separate. 
  This unexpectedly can be leveraged for really easy serialisation to disk.
slug: ecs-serialisation
---

I've spent a minute working on a prototype game in order to 're-fire' my old game development muscles in anticipation for a larger project later in the year.
Instead of using Unity, 
which I'd usually opt for as all my game-dev experience is with it, and I write a lot of C#,
I decided to roll my own engine.
Partly because A) fun and B) this vague future game involves _a lot_ of data and simulation, which Unity doesn't really handle well.
Additionally, I've used Unity for long enough that I'm very familiar with its pitfalls - specifically, the frustration of writing tests.
However, I should write about my qualms with Unity and its utter disregard for good testing abilities in a different post. 

Today is about serialisation with ECS!

ECS stands for **E**ntity **C**omponent **S**ystem.
It's not got system at the end because it's a system, instead, systems - just like components and entities - are part of the whole framework.
Technically it should be called an Entity-Component-System system, but that's just silly.
ECS is a data-oriented replacement for the more object-oriented approach seen in most engines.
This [article](https://www.gamedev.net/articles/programming/general-and-gameplay-programming/understanding-component-entity-systems-r3013/) explains the need quite well,
but overall ECS is more efficient for large amounts of entities.
It's also (as I have found out) a lot more fun to program with!

The point of this post is that at some point in every relatively large game development project there comes the point in time when the developer
must implement saving and loading games, which I call an 'ah shit' moment.
I call it that because the realisation of suddenly having to rework all your scripts to be able to serialise their data is a huge, daunting and time-consuming undertaking,
and makes you think that game dev sucks.

## Not so with ECS!

If you're doing ECS properly then _all_ your game state is stored in the components.
It's as easy as taking all the entities and serialising their components as parent-child relationships,
and since components are just small data-holders, this is very easy to achieve with any decent serialisation library.

There are _some_ caveats, however. The big one is that you should be using a decent ECS framework with good abstraction that treats entities as pure IDs.
This is pretty important as it is pretty common to reference an entity from another component.
Think an inventory component which has references to many item entities.
Why would that be an issue? 
Well, most modern serialisation libraries has generally agreed that serialising object references is a really f*cking bad idea.
With a good ECS system, a reference to an entity can just be serialised as the entities ID.
More on this later.

## So how?

I've elected to use;

 - Kotlin, because it's a fun and expressive language.
 - For the ECS I'm going to use [Fleks by Quillraven](https://github.com/Quillraven/Fleks).
 - For serialisation I'm going to use [kotlinx.serialization](https://github.com/Kotlin/kotlinx.serialization).

The use of Fleks is important, as mentioned previously, ECS is data-oriented and not object-oriented. 
That means, it shouldn't (not really) rely on object references! 
With Fleks, entity objects are literally just integer IDs.
They don't have any other members.
Component access is provided by the _world context_ thanks to some Kotlin acrobatics that make it _look_ like the entity has members.

That means one can literally just do;

```kotlin
val w = configureWorld {  }
val entityBar = w.entity {
    it += Scale(amount = 6) // Creates an entity with a scale component.
}

fun foo(world: World) {
    val entity = Entity(0) // Assuming `entityBar` has ID 0
    val scale = with(world) { entity[Scale] } // Accesses that original scale component.
    assertEquals(6, scale.amount)
}
```

See that? Pulled an entity out of thin air, and used the context of the world to retrieve its components.

Fleks also provides a `World.snapshot()` method which gives a complete freeze of the entities and components. 
It's return type is `Map<Entity, List<Component<*>>>`.

The kotlinx.serialization library works by generating serializers for classes marked with `@Serializable` at compile time. 

By default, `Entity` is marked as serializable, but `Component<*>` is not. 
We can solve this by making components inherit from an empty interface `@Serializable interface SerializableComponent`,
which is (obviously) an open interface.
Since `kotlinx.serialization` creates serializers as part of a compilation step, 
it needs to know ahead of time what classes that extend `SerializableComponent` it should generate serializers for.
Since `kotlinx.serialization` takes an explicit approach, we need to point out which children of `SerializableComponent` should get serialized. 
We do this by constructing a _polymorphic module_ for the serializer.

```kotlin
val defaultModule = SerializersModule {
    polymorphic(SerialisableComponent::class) { 
        subclass(Transform::class)
        /* Other components */
    }
}
```

Lovely lovely. But your code still won't work. 
Why? We're trying to serialize a map, which in JSON is a key-value pair.
Entities will try and serialize as an ID, which is a number.
JSON doesn't allow map keys to be numbers. Uh oh.
That's a simple fix, however.
We just write a custom serializer for entities!

```kotlin

object EntitySerializer : KSerializer<Entity> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Entity", PrimitiveKind.INT)
    override fun serialize(encoder: Encoder, value: Entity) = encoder.encodeInt(value.id)
    override fun deserialize(decoder: Decoder): Entity = Entity(decoder.decodeInt())
}

```

We then need to register this - `kotlinx.serialization` only supports an explicit approach, so we can't globally define a serializer for Entities.
Instead, we must mark them as contextual.
For reasons I will cover later, we only need to mark the entities in the snapshot map as contextual.

```kotlin
val defaultModule = SerializersModule {
    polymorphic(SerialisableComponent::class) { 
        subclass(Transform::class)
        /* Other components */
    }
    contextual(EntitySerializer)
}
```

The serializer, in this case JSON, takes a module. One of these module elements is a `polymorphic` clause, 
which allows use to define a class hierarchy 

Well, modern serialisation frameworks have generally agreed that serialising object references is a really f*cking bad idea.
It's very difficult to cover all use-cases and edge-cases.
So don't do it.

This is relevant because some of your components will need to reference other entities
It's much easier to serialise a reference to an ID than a location in memory.

## So how do we do it?

The serialisation library I use with Kotlin is, of course, `kotlinx.serialization` - because it's great.

- ECS is good for serialisation
- Get a snapshot of the entities and their components
- Save it!
- How to do it with Fleks and Kotlinx.serialization?
  - Fleks.snapshot
  - Serialising components.
- Some important caveats.
  - Don't reference components from components.
