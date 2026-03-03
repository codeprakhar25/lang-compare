// Code examples for each language — shown in the playground comparison
// Each example demonstrates: variable declaration, a function, error handling, and a data structure

export interface CodeExample {
  langId: string;
  title: string;
  description: string;
  code: string;
  language: string; // for syntax highlighting hint
}

export const codeExamples: Record<string, CodeExample[]> = {
  rust: [
    {
      langId: "rust",
      title: "Ownership & Memory Safety",
      description: "Rust's ownership system guarantees memory safety without a GC",
      language: "rust",
      code: `fn main() {
    // Ownership — no GC needed
    let name = String::from("Rustacean");
    greet(&name);  // borrow — name is still valid
    println!("Still have: {}", name);

    // Pattern matching + Result
    match divide(10.0, 0.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e)     => println!("Error: {}", e),
    }

    // Zero-cost iterator
    let sum: i32 = (1..=100).filter(|n| n % 2 == 0).sum();
    println!("Sum of evens 1-100: {}", sum);
}

fn greet(name: &str) {
    println!("Hello, {}!", name);
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Cannot divide by zero".into())
    } else {
        Ok(a / b)
    }
}`,
    },
    {
      langId: "rust",
      title: "Fearless Concurrency",
      description: "Data races are a compile error, not a runtime bug",
      language: "rust",
      code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let c = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = c.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for h in handles { h.join().unwrap(); }
    println!("Counter: {}", *counter.lock().unwrap()); // 10
}`,
    },
  ],

  c: [
    {
      langId: "c",
      title: "Manual Memory Management",
      description: "Direct control over every byte — total power, total responsibility",
      language: "c",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char  *name;
    int    age;
} Person;

Person *person_new(const char *name, int age) {
    Person *p = malloc(sizeof(Person));
    if (!p) return NULL;           // always check!
    p->name = strdup(name);        // allocates memory for string
    p->age  = age;
    return p;
}

void person_free(Person *p) {
    if (!p) return;
    free(p->name);                 // free inner alloc first
    free(p);                       // then free struct
}

int main(void) {
    Person *p = person_new("Alice", 30);
    printf("Name: %s, Age: %d\\n", p->name, p->age);
    person_free(p);                // must free manually
    p = NULL;                      // avoid dangling pointer
    return 0;
}`,
    },
  ],

  cpp: [
    {
      langId: "cpp",
      title: "RAII & Modern C++",
      description: "RAII + smart pointers make C++ memory management safer",
      language: "cpp",
      code: `#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>

class Animal {
public:
    std::string name;
    Animal(std::string n) : name(std::move(n)) {
        std::cout << name << " born\\n";
    }
    ~Animal() { std::cout << name << " freed\\n"; }
    virtual std::string sound() const = 0;
};

class Dog : public Animal {
public:
    Dog(std::string n) : Animal(std::move(n)) {}
    std::string sound() const override { return "Woof"; }
};

int main() {
    // unique_ptr — automatic cleanup via RAII
    auto animals = std::vector<std::unique_ptr<Animal>>{};
    animals.push_back(std::make_unique<Dog>("Rex"));
    animals.push_back(std::make_unique<Dog>("Buddy"));

    for (const auto &a : animals) {
        std::cout << a->name << " says " << a->sound() << "\\n";
    }
    // Destructors run automatically here — no memory leaks
}`,
    },
  ],

  java: [
    {
      langId: "java",
      title: "OOP & Streams",
      description: "Classic Java OOP with modern stream API",
      language: "java",
      code: `import java.util.*;
import java.util.stream.*;

record Person(String name, int age) {}  // Java 16+ record

public class Main {
    public static Optional<String> greetAdult(Person p) {
        return p.age() >= 18
            ? Optional.of("Hello, " + p.name())
            : Optional.empty();
    }

    public static void main(String[] args) {
        var people = List.of(
            new Person("Alice", 30),
            new Person("Bob",   17),
            new Person("Carol", 25)
        );

        // Stream pipeline — functional style
        people.stream()
              .filter(p -> p.age() >= 18)
              .map(Person::name)
              .sorted()
              .forEach(System.out::println);

        // Pattern matching (Java 21)
        Object obj = 42;
        if (obj instanceof Integer i) {
            System.out.println("Integer: " + i);
        }
    }
}`,
    },
  ],

  csharp: [
    {
      langId: "csharp",
      title: "LINQ & Async/Await",
      description: "C#'s powerful LINQ and async model",
      language: "csharp",
      code: `using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

record Person(string Name, int Age);

class Program {
    static async Task<string> FetchDataAsync(string url) {
        await Task.Delay(100); // simulate HTTP call
        return $"Data from {url}";
    }

    static async Task Main() {
        var people = new List<Person> {
            new("Alice", 30), new("Bob", 17), new("Carol", 25)
        };

        // LINQ — expressive data querying
        var adults = people
            .Where(p => p.Age >= 18)
            .OrderBy(p => p.Name)
            .Select(p => p.Name);

        Console.WriteLine(string.Join(", ", adults));

        // Async/await — clean non-blocking I/O
        var tasks = new[] { "api/users", "api/posts" }
            .Select(FetchDataAsync);
        var results = await Task.WhenAll(tasks);
        foreach (var r in results) Console.WriteLine(r);
    }
}`,
    },
  ],

  python: [
    {
      langId: "python",
      title: "Pythonic Code",
      description: "Clean, readable Python — fast to write, slow to run",
      language: "python",
      code: `from dataclasses import dataclass
from typing import Optional
import asyncio

@dataclass
class Person:
    name: str
    age: int

    def greet(self) -> str:
        return f"Hi, I'm {self.name}, {self.age} years old"

def find_adult(people: list[Person]) -> Optional[Person]:
    return next((p for p in people if p.age >= 18), None)

# List comprehensions — idiomatic Python
people = [Person("Alice", 30), Person("Bob", 17), Person("Carol", 25)]
adults = [p.name for p in people if p.age >= 18]
print(sorted(adults))  # ['Alice', 'Carol']

# Async I/O
async def fetch(url: str) -> str:
    await asyncio.sleep(0.1)   # simulate network
    return f"data from {url}"

async def main():
    urls = ["api/users", "api/posts"]
    results = await asyncio.gather(*[fetch(u) for u in urls])
    for r in results:
        print(r)

asyncio.run(main())`,
    },
  ],

  javascript: [
    {
      langId: "javascript",
      title: "Modern JavaScript",
      description: "ES2024 JS with async/await and destructuring",
      language: "javascript",
      code: `// Destructuring + default params
const greet = ({ name, age = 0 } = {}) =>
  age >= 18 ? \`Hello, \${name}!\` : \`Hey \${name}, you're young!\`;

console.log(greet({ name: "Alice", age: 30 }));

// Async/await — non-blocking I/O
const fetchUser = async (id) => {
  const res = await fetch(\`https://api.example.com/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
};

// Promise.all for concurrency
const loadDashboard = async () => {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/comments").then(r => r.json()),
  ]);
  return { user, posts, comments };
};

// Optional chaining + nullish coalescing
const city = user?.address?.city ?? "Unknown";

// Array methods
const adults = people
  .filter(p => p.age >= 18)
  .map(p => p.name)
  .sort();`,
    },
  ],

  typescript: [
    {
      langId: "typescript",
      title: "TypeScript Type Safety",
      description: "Types catch bugs at compile time, not 2AM in production",
      language: "typescript",
      code: `// Discriminated union — exhaustive pattern matching
type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle";  base: number;  height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2;
    case "rectangle": return shape.width * shape.height;
    case "triangle":  return 0.5 * shape.base * shape.height;
    // TS errors if you miss a case — exhaustiveness check
  }
}

// Generic with constraint
async function fetchData<T extends { id: number }>(
  url: string
): Promise<T[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`\${res.status}: \${res.statusText}\`);
  return res.json() as Promise<T[]>;
}

// Utility types
type UserPreview = Pick<User, "id" | "name" | "avatar">;
type UpdateUser  = Partial<Omit<User, "id" | "createdAt">>;`,
    },
  ],

  go: [
    {
      langId: "go",
      title: "Go Simplicity & Goroutines",
      description: "Goroutines make concurrency trivially easy",
      language: "go",
      code: `package main

import (
    "fmt"
    "sync"
    "errors"
)

type Person struct {
    Name string
    Age  int
}

// Multiple return values for error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    // Error handling — explicit, verbose, but clear
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("%.2f\\n", result)
    }

    // Goroutines + WaitGroup — trivial concurrency
    var wg sync.WaitGroup
    results := make(chan string, 5)

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            results <- fmt.Sprintf("worker %d done", id)
        }(i)
    }

    go func() { wg.Wait(); close(results) }()
    for r := range results { fmt.Println(r) }
}`,
    },
  ],

  kotlin: [
    {
      langId: "kotlin",
      title: "Kotlin Null Safety & Coroutines",
      description: "Null safety at the type level + elegant coroutines",
      language: "kotlin",
      code: `import kotlinx.coroutines.*

data class User(val name: String, val age: Int)

// Null safety — compiler enforces it
fun greetUser(user: User?): String {
    return user?.let { "Hello, \${it.name}!" } ?: "No user found"
}

// Extension functions
fun List<User>.adults() = filter { it.age >= 18 }

// Sealed class — exhaustive when
sealed class Result<out T>
data class Success<T>(val data: T) : Result<T>()
data class Failure(val error: String) : Result<Nothing>()

fun <T> handle(result: Result<T>) = when (result) {
    is Success -> println("Got: \${result.data}")
    is Failure -> println("Err: \${result.error}")
}

// Coroutines — structured concurrency
fun main() = runBlocking {
    val users = listOf(User("Alice", 30), User("Bob", 17))
    users.adults().forEach { println(it.name) }

    val deferred = async { fetchRemote("api/data") }
    println(deferred.await())
}

suspend fun fetchRemote(url: String): String {
    delay(100)
    return "data from $url"
}`,
    },
  ],

  swift: [
    {
      langId: "swift",
      title: "Swift Optionals & Actors",
      description: "Optionals eliminate null crashes; actors prevent data races",
      language: "swift",
      code: `import Foundation

struct Person {
    let name: String
    let age: Int
}

// Optionals — nil safety at type level
func findPerson(named: String, in people: [Person]) -> Person? {
    people.first { $0.name == named }
}

let people = [Person(name: "Alice", age: 30), Person(name: "Bob", age: 17)]

// Optional chaining + nil coalescing
let greeting = findPerson(named: "Alice", in: people)
    .map { "Hello, \\($0.name)!" }
    ?? "Person not found"
print(greeting)

// Swift Concurrency — actors prevent data races
actor BankAccount {
    private var balance: Double = 0

    func deposit(_ amount: Double) { balance += amount }
    func getBalance() -> Double   { balance }
}

// Async/await
let account = BankAccount()
Task {
    await account.deposit(1000)
    print("Balance: \\(await account.getBalance())")
}`,
    },
  ],

  ruby: [
    {
      langId: "ruby",
      title: "Ruby Elegance",
      description: "The most readable syntax — code that reads like English",
      language: "ruby",
      code: `# Ruby reads like prose
Person = Data.define(:name, :age)

people = [
  Person.new(name: "Alice", age: 30),
  Person.new(name: "Bob",   age: 17),
  Person.new(name: "Carol", age: 25)
]

# Chained enumerable methods — very readable
adults = people
  .select { |p| p.age >= 18 }
  .map(&:name)
  .sort

puts adults.join(", ")  # Alice, Carol

# Blocks — Ruby's killer feature
def repeat(n, &block)
  n.times.map { block.call }
end

results = repeat(3) { rand(100) }
puts results.inspect

# Metaprogramming
module Greetable
  def greet = "Hello, I'm #{name}"
end

class User
  include Greetable
  attr_reader :name
  def initialize(name) = @name = name
end

puts User.new("Alice").greet`,
    },
  ],

  php: [
    {
      langId: "php",
      title: "Modern PHP 8",
      description: "PHP 8 with types, match, and named args is much better than its reputation",
      language: "php",
      code: `<?php declare(strict_types=1);

// PHP 8 — readonly props, constructor promotion, match
readonly class Person {
    public function __construct(
        public string $name,
        public int    $age,
    ) {}

    public function greeting(): string {
        return match(true) {
            $this->age < 13 => "Hey kid, {$this->name}!",
            $this->age < 18 => "Sup {$this->name}!",
            default         => "Hello, {$this->name}.",
        };
    }
}

$people = [
    new Person("Alice", 30),
    new Person("Bob",   17),
    new Person("Carol", 12),
];

// Named arguments + array functions
$adults = array_filter($people, fn(Person $p) => $p->age >= 18);
$names  = array_map(fn(Person $p) => $p->name, $adults);
sort($names);

echo implode(", ", $names) . PHP_EOL;  // Alice, Carol

foreach ($people as $person) {
    echo $person->greeting() . PHP_EOL;
}`,
    },
  ],

  scala: [
    {
      langId: "scala",
      title: "Scala FP Power",
      description: "Pure functional programming with a powerful type system",
      language: "scala",
      code: `// Scala 3
case class Person(name: String, age: Int)

// ADT (Algebraic Data Type)
enum Result[+A]:
  case Ok(value: A)
  case Err(msg: String)

// Pattern matching is exhaustive
def describe(r: Result[Int]): String = r match
  case Result.Ok(v)  => s"Success: $v"
  case Result.Err(e) => s"Failure: $e"

@main def run(): Unit =
  val people = List(
    Person("Alice", 30),
    Person("Bob",   17),
    Person("Carol", 25)
  )

  // Functional pipeline
  val adultNames = people
    .filter(_.age >= 18)
    .map(_.name)
    .sorted

  println(adultNames.mkString(", "))

  // For-comprehension (monadic)
  val result = for
    x <- Some(10)
    y <- Some(5)
    if y != 0
  yield x / y

  println(result.getOrElse(0))  // 2`,
    },
  ],

  dart: [
    {
      langId: "dart",
      title: "Dart Null Safety",
      description: "Sound null safety and Flutter-ready async patterns",
      language: "dart",
      code: `// Dart — sound null safety
class Person {
  final String name;
  final int age;
  const Person(this.name, this.age);

  String get greeting => age >= 18
    ? 'Hello, $name!'
    : 'Hey $name!';
}

// Sealed class (Dart 3)
sealed class Shape {}
class Circle    extends Shape { final double radius; Circle(this.radius); }
class Rectangle extends Shape { final double w, h;  Rectangle(this.w, this.h); }

double area(Shape s) => switch (s) {
  Circle c    => 3.14159 * c.radius * c.radius,
  Rectangle r => r.w * r.h,
};

// Async/await — standard in Flutter
Future<String> fetchData(String url) async {
  await Future.delayed(Duration(milliseconds: 100));
  return 'data from $url';
}

void main() async {
  final people = [Person('Alice', 30), Person('Bob', 17)];
  
  // Null-safe collection operations
  final adults = people
    .where((p) => p.age >= 18)
    .map((p) => p.name)
    .toList()
    ..sort();
  
  print(adults);  // [Alice]

  final data = await fetchData('api/users');
  print(data);
}`,
    },
  ],
};
