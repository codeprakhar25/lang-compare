export interface Language {
  id: string;
  name: string;
  icon: string;
  year: number;
  creator: string;
  category: "systems" | "web" | "enterprise" | "scripting" | "general";
  categoryLabel: string;
  color: string;        // primary brand color
  bgColor: string;      // card bg tint

  // Ratings 1–10
  performance: number;
  memoryEfficiency: number;
  learnability: number;
  devSpeed: number;
  ecosystem: number;
  concurrency: number;
  typeStrength: number;  // 1=dynamic/weak, 10=static/strong

  // Text descriptors
  performanceLabel: string;
  memoryLabel: string;
  latency: string;
  gcModel: string;
  typing: string;
  paradigm: string;

  // Deep info
  pros: string[];
  cons: string[];
  useCases: string[];
  notGoodFor: string[];
  verdict: string;
  
  // Tooltip details per metric
  tooltips: {
    performance: string;
    memory: string;
    latency: string;
    learnability: string;
    ecosystem: string;
    concurrency: string;
  };

  // Famous projects built with it
  famousProjects: string[];

  // Job market insight
  jobMarket: "low" | "medium" | "high" | "very-high";
  salaryRange: string; // USD/year approx
}

export const languages: Language[] = [
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    year: 2015,
    creator: "Graydon Hoare / Mozilla",
    category: "systems",
    categoryLabel: "Systems",
    color: "#f97316",
    bgColor: "#1a0d00",
    performance: 10,
    memoryEfficiency: 10,
    learnability: 2,
    devSpeed: 4,
    ecosystem: 7,
    concurrency: 10,
    typeStrength: 10,
    performanceLabel: "S-Tier / Bare Metal",
    memoryLabel: "Minimal — zero overhead",
    latency: "Deterministic — no GC",
    gcModel: "None — Ownership system",
    typing: "Static + Inferred",
    paradigm: "Multi-paradigm",
    pros: [
      "Memory safety without a garbage collector",
      "Zero-cost abstractions — pay only for what you use",
      "Fearless concurrency — data races caught at compile time",
      "Cargo is the best build tool in any ecosystem",
      "Compiles to WebAssembly natively",
      "Excellent error messages that teach you the language",
      "C-interop via FFI",
    ],
    cons: [
      "Steepest learning curve of any mainstream language",
      "Borrow checker fights beginners relentlessly",
      "Slow compilation times on large codebases",
      "Async Rust is notably complex",
      "Smaller job market than Java/Python/JS",
      "Verbose for simple tasks compared to Python/Go",
    ],
    useCases: [
      "OS / Kernels (Linux now accepts Rust)",
      "WebAssembly",
      "Game engines (Bevy)",
      "Embedded / Firmware",
      "High-performance servers (Axum, Actix)",
      "CLI tools (ripgrep, bat, fd)",
      "Blockchain (Solana core)",
      "Browsers (Firefox components)",
    ],
    notGoodFor: [
      "Quick scripts and automation",
      "RAD / MVP prototyping",
      "Data science / ML",
      "Beginners as a first language",
    ],
    verdict:
      "The safest way to write systems-level code that ever existed. The borrow checker is the price of admission — pay it once, never pay it in production bugs.",
    tooltips: {
      performance:
        "Compiles to native machine code with zero-cost abstractions. Benchmarks consistently match C and C++. No runtime overhead from GC or interpreter.",
      memory:
        "Ownership system ensures memory is freed exactly when no longer needed — no leaks, no dangling pointers, no GC pauses. The most memory-efficient safe language.",
      latency:
        "Fully deterministic. Since there's no garbage collector, you never get unexpected GC pause spikes. Critical for real-time systems and game engines.",
      learnability:
        "The borrow checker rejects code patterns that work fine in other languages. Expect 4–8 weeks before it 'clicks'. The compiler errors are very good at explaining why.",
      ecosystem:
        "crates.io is growing fast. Strong in systems, WASM, CLI, and web (Axum). Thinner in ML/data compared to Python. Cargo is widely praised as the best package manager.",
      concurrency:
        "The type system makes data races a compile error. 'Fearless concurrency' is real — sharing state across threads is safe by construction. Async/await exists but is complex.",
    },
    famousProjects: ["Firefox (Servo)", "Linux Kernel", "Cloudflare Workers", "Discord (perf-critical services)", "Solana", "ripgrep"],
    jobMarket: "medium",
    salaryRange: "$130K–$200K",
  },

  {
    id: "c",
    name: "C",
    icon: "⚙️",
    year: 1972,
    creator: "Dennis Ritchie / Bell Labs",
    category: "systems",
    categoryLabel: "Systems",
    color: "#6366f1",
    bgColor: "#0a0a1a",
    performance: 10,
    memoryEfficiency: 10,
    learnability: 4,
    devSpeed: 2,
    ecosystem: 9,
    concurrency: 5,
    typeStrength: 4,
    performanceLabel: "S-Tier / Absolute",
    memoryLabel: "Manual — total control",
    latency: "Deterministic — no runtime",
    gcModel: "None — Manual malloc/free",
    typing: "Static, Weakly Typed",
    paradigm: "Procedural",
    pros: [
      "Maximum possible performance",
      "Full hardware and memory control",
      "Runs on everything — from MCUs to supercomputers",
      "Lingua franca of systems programming",
      "Massive legacy ecosystem",
      "Near-universal FFI target for other languages",
    ],
    cons: [
      "Manual memory management — leaks and corruption are common",
      "Buffer overflows are trivially easy to introduce",
      "No OOP, no generics, no namespaces",
      "Low abstraction — very verbose",
      "Undefined behavior is a constant hazard",
      "Header/include system is archaic",
    ],
    useCases: [
      "Operating system kernels (Linux, Windows NT)",
      "Device drivers and firmware",
      "Embedded systems",
      "Compilers and interpreters",
      "High-frequency trading infrastructure",
      "Real-time systems",
    ],
    notGoodFor: [
      "Application-level software",
      "Web development",
      "Data science",
      "Rapid prototyping",
    ],
    verdict:
      "The foundation that everything else is built on. Unmatched performance and portability — but one wrong pointer away from a CVE.",
    tooltips: {
      performance:
        "C compiles to extremely tight machine code. The compiler (GCC/Clang) optimizes aggressively. It's the baseline against which all other languages are measured.",
      memory:
        "You allocate and free everything manually with malloc/free. Zero overhead — but total responsibility. A freed pointer you still hold is a use-after-free vulnerability.",
      latency:
        "No runtime, no GC, no JIT warmup. What you write is what runs. Latency is as low as the hardware allows.",
      learnability:
        "Syntax is learnable in weeks, but writing correct, safe C takes years of experience. Pointers, memory layout, and UB traps require deep understanding.",
      ecosystem:
        "Decades of libraries for everything. POSIX, OpenSSL, SQLite, GTK — the most battle-tested ecosystem in existence. Package management is fragmented though.",
      concurrency:
        "Pthreads and platform APIs work but offer no safety guarantees. Race conditions and deadlocks are your responsibility to prevent entirely.",
    },
    famousProjects: ["Linux Kernel", "CPython interpreter", "PostgreSQL", "SQLite", "Git", "OpenSSL"],
    jobMarket: "medium",
    salaryRange: "$100K–$160K",
  },

  {
    id: "cpp",
    name: "C++",
    icon: "🔧",
    year: 1985,
    creator: "Bjarne Stroustrup / Bell Labs",
    category: "systems",
    categoryLabel: "Systems",
    color: "#06b6d4",
    bgColor: "#001215",
    performance: 10,
    memoryEfficiency: 9,
    learnability: 1,
    devSpeed: 3,
    ecosystem: 10,
    concurrency: 6,
    typeStrength: 7,
    performanceLabel: "S-Tier / Near-native",
    memoryLabel: "Manual + RAII",
    latency: "Deterministic with RAII",
    gcModel: "None — RAII / Smart Pointers",
    typing: "Static, Weakly Typed",
    paradigm: "Multi-paradigm",
    pros: [
      "Zero-cost abstractions at language level",
      "OOP, templates, metaprogramming — extreme flexibility",
      "Enormous ecosystem (Boost, Qt, etc.)",
      "Full hardware control",
      "Standard in AAA game development",
      "RAII makes resource management safer than C",
    ],
    cons: [
      "Arguably the most complex language in existence",
      "UB (undefined behavior) is everywhere",
      "Memory safety still requires discipline",
      "Compile times can be extremely slow (templates)",
      "No single blessed toolchain or package manager",
      "Too many ways to do the same thing",
    ],
    useCases: [
      "AAA game development (Unreal Engine)",
      "Game engines",
      "Browsers (Chrome, Firefox core)",
      "HFT / low-latency finance",
      "Computer vision and robotics",
      "Compilers (LLVM/Clang is C++)",
      "Embedded with high performance needs",
    ],
    notGoodFor: [
      "Web applications",
      "Scripting",
      "Beginners",
      "Applications where safety matters more than speed",
    ],
    verdict:
      "Power without a safety net. C++ can do anything C can do plus give you enough rope to hang yourself in a hundred new ways. Mastery takes years.",
    tooltips: {
      performance:
        "Templates allow zero-overhead abstractions that the compiler resolves at compile time. Inlining, SIMD, and aggressive optimization make C++ one of the fastest compiled languages.",
      memory:
        "RAII (Resource Acquisition Is Initialization) and smart pointers (unique_ptr, shared_ptr) make memory safer than C. But raw pointers still exist and UB is a constant risk.",
      latency:
        "RAII enables deterministic destruction. No GC, but you can still cause issues with shared_ptr cycles. Generally very predictable latency.",
      learnability:
        "C++ has 40 years of accumulated complexity. Multiple inheritance, templates, the preprocessor, move semantics, SFINAE — the language never stops surprising you.",
      ecosystem:
        "The largest systems ecosystem in the world. Boost, Qt, Eigen, OpenCV, Unreal — decades of battle-tested libraries. CMake/Conan/vcpkg are getting better.",
      concurrency:
        "std::thread, std::atomic, std::mutex since C++11. Reasonably good but no language-level safety. Coroutines in C++20 improve async. Still requires discipline.",
    },
    famousProjects: ["Unreal Engine", "Chrome (V8, Blink)", "LLVM / Clang", "Adobe Photoshop", "Microsoft Office", "MySQL"],
    jobMarket: "high",
    salaryRange: "$120K–$180K",
  },

  {
    id: "java",
    name: "Java",
    icon: "☕",
    year: 1995,
    creator: "James Gosling / Sun Microsystems",
    category: "enterprise",
    categoryLabel: "Enterprise",
    color: "#f59e0b",
    bgColor: "#160c00",
    performance: 7,
    memoryEfficiency: 4,
    learnability: 6,
    devSpeed: 5,
    ecosystem: 10,
    concurrency: 7,
    typeStrength: 8,
    performanceLabel: "Good — JIT optimized",
    memoryLabel: "Heavy — JVM overhead",
    latency: "GC pauses (ms range)",
    gcModel: "JVM GC (G1/ZGC/Shenandoah)",
    typing: "Static, Strongly Typed",
    paradigm: "OOP + Functional (Java 8+)",
    pros: [
      "Write once, run anywhere (JVM)",
      "Massive battle-tested ecosystem (Maven/Gradle)",
      "Excellent for large teams and codebases",
      "Strong OOP model with interfaces",
      "JIT compiler produces fast code at runtime",
      "Android development (legacy)",
      "Excellent tooling (IntelliJ IDEA)",
    ],
    cons: [
      "JVM memory overhead — apps start heavy",
      "GC pauses hurt latency-sensitive workloads",
      "Verbose boilerplate (still improving)",
      "Slow cold start (bad for serverless)",
      "Less fun to write compared to modern languages",
      "Generics have type erasure quirks",
    ],
    useCases: [
      "Enterprise backends (Spring Boot)",
      "Microservices at scale",
      "Big Data (Hadoop, Spark, Kafka)",
      "Banking and financial systems",
      "Android apps (legacy)",
      "Trading platforms",
    ],
    notGoodFor: [
      "Serverless / edge functions (cold start)",
      "Systems programming",
      "Scripting",
      "Latency under 1ms requirements",
    ],
    verdict:
      "The backbone of enterprise software for 30 years. Verbose but reliable. Modern Java (17+) is significantly more pleasant — records, sealed classes, and pattern matching help.",
    tooltips: {
      performance:
        "JIT compilation (HotSpot) optimizes hot code paths at runtime. Can match C++ on throughput for long-running services. Startup time and memory footprint are the real costs.",
      memory:
        "The JVM itself uses 50–200MB before your app even loads. Class metadata, JIT caches, GC overhead — Java apps are memory-hungry by nature.",
      latency:
        "GC pauses are the main concern. G1GC targets <200ms, ZGC and Shenandoah target <10ms. For p999 latency, even these can be a problem in HFT scenarios.",
      learnability:
        "Java is one of the best first languages — strongly typed, consistent, and beginner-friendly. The verbose boilerplate teaches explicit structure which is good for learning.",
      ecosystem:
        "The Java ecosystem is enormous: Spring, Hibernate, Kafka, Spark, Maven Central. 30 years of libraries for every use case imaginable. Unmatched for enterprise.",
      concurrency:
        "Threads, synchronized, java.util.concurrent, CompletableFuture, and now Virtual Threads (Java 21) via Project Loom. Loom is a game-changer for scalability.",
    },
    famousProjects: ["LinkedIn backend", "Netflix (partially)", "Minecraft", "Apache Kafka", "Elasticsearch", "Android"],
    jobMarket: "very-high",
    salaryRange: "$110K–$170K",
  },

  {
    id: "csharp",
    name: "C#",
    icon: "🔷",
    year: 2000,
    creator: "Anders Hejlsberg / Microsoft",
    category: "enterprise",
    categoryLabel: "Enterprise",
    color: "#8b5cf6",
    bgColor: "#0a0512",
    performance: 8,
    memoryEfficiency: 6,
    learnability: 6,
    devSpeed: 7,
    ecosystem: 8,
    concurrency: 8,
    typeStrength: 9,
    performanceLabel: "Very Good — .NET 8 NativeAOT",
    memoryLabel: "Moderate — .NET runtime",
    latency: "GC pauses (low with tuning)",
    gcModel: ".NET GC (generational)",
    typing: "Static + Inferred, Strongly Typed",
    paradigm: "Multi-paradigm",
    pros: [
      "Modern, elegant, expressive syntax",
      "LINQ is extraordinarily powerful for data",
      "Best async/await model of any OOP language",
      "Unity — dominant in game dev",
      "NativeAOT in .NET 8 for fast startup",
      "Nullable reference types catch null errors",
      "Pattern matching is excellent",
    ],
    cons: [
      "Historically Windows/Microsoft-centric",
      "GC pauses in latency-critical scenarios",
      "Ecosystem outside .NET can feel thin",
      "Less popular in Linux/cloud-native infra",
      "Microsoft could change direction (though unlikely)",
    ],
    useCases: [
      "Unity game development",
      "ASP.NET Core web backends",
      "Enterprise Windows applications",
      "Azure cloud services",
      "Desktop apps (WPF, MAUI)",
      "Blazor web apps",
    ],
    notGoodFor: [
      "Systems programming",
      "Scripting / automation",
      "Linux-native infrastructure tooling",
    ],
    verdict:
      "Java done right, with better syntax and a more cohesive standard library. Significantly underrated outside the Microsoft world. .NET 8 is genuinely excellent.",
    tooltips: {
      performance:
        ".NET 8 with NativeAOT compiles to native binaries with fast startup and low memory. JIT mode rivals Java performance. ASP.NET Core consistently tops TechEmpower benchmarks.",
      memory:
        ".NET runtime is lighter than the JVM. Span<T> and Memory<T> enable zero-allocation patterns. Still heavier than Rust/C++ but much better than Python.",
      latency:
        ".NET's GC is generational and generally low-pause. Server GC mode for throughput vs workstation for latency. GC pauses are real but manageable.",
      learnability:
        "C# is well-designed and consistent. Coming from Java it's an easy transition. The language has grown complex over time but you can use simple subsets effectively.",
      ecosystem:
        "NuGet is solid. ASP.NET Core, EF Core, Blazor, SignalR, ML.NET — a complete stack. Thinner than Java for big data/enterprise infrastructure tools.",
      concurrency:
        "async/await is the gold standard — it's cleaner here than in most languages. Task Parallel Library, Channel<T>, and actor-style patterns all work well.",
    },
    famousProjects: ["Unity Engine", "Stack Overflow", "Visual Studio Code (partly)", "Azure DevOps", "HoloLens OS"],
    jobMarket: "high",
    salaryRange: "$110K–$165K",
  },

  {
    id: "python",
    name: "Python",
    icon: "🐍",
    year: 1991,
    creator: "Guido van Rossum",
    category: "scripting",
    categoryLabel: "Scripting / AI",
    color: "#22c55e",
    bgColor: "#01100a",
    performance: 2,
    memoryEfficiency: 3,
    learnability: 10,
    devSpeed: 10,
    ecosystem: 10,
    concurrency: 3,
    typeStrength: 4,
    performanceLabel: "Slow — CPython ~100x C",
    memoryLabel: "High — object overhead",
    latency: "Very High — interpreted",
    gcModel: "Reference Counting + Cyclic GC",
    typing: "Dynamic, Strongly Typed",
    paradigm: "Multi-paradigm",
    pros: [
      "Easiest language to learn — period",
      "Dominates AI/ML (PyTorch, TensorFlow, scikit-learn)",
      "Largest library ecosystem for data science",
      "Fastest prototyping speed",
      "Reads like pseudocode",
      "Jupyter notebooks for exploration",
      "Great for glue code and automation",
    ],
    cons: [
      "CPython is slow — ~100x slower than C for CPU-bound tasks",
      "GIL prevents true multi-threading",
      "High memory usage per object",
      "Dynamic typing hides bugs until runtime",
      "Not suitable for mobile or embedded",
      "Dependency management is historically messy (improving with uv/poetry)",
    ],
    useCases: [
      "AI / Machine Learning / Deep Learning",
      "Data science and analytics",
      "Scientific computing",
      "Backend APIs (FastAPI, Django)",
      "Scripting and automation",
      "Research and education",
      "DevOps tooling",
    ],
    notGoodFor: [
      "Mobile apps",
      "High-performance / real-time systems",
      "Embedded systems",
      "CPU-intensive computation (without C extensions)",
    ],
    verdict:
      "The world's most popular language for excellent reasons. For AI and data it's uncontested. For everything else, use it for speed of development — just don't expect speed of execution.",
    tooltips: {
      performance:
        "CPython interprets bytecode. For pure Python, expect 20–100x slower than C. The trick: numpy, PyTorch etc. call into C/CUDA under the hood. Python is the glue, not the engine.",
      memory:
        "Every Python object has ~28 bytes overhead minimum. A list of integers uses far more memory than a C array. PyPy or native extensions help but CPython itself is memory-hungry.",
      latency:
        "Not suitable for latency-sensitive work. Interpreted, GIL-constrained, GC overhead. FastAPI/Uvicorn helps for I/O bound web but CPU-bound tasks will bottleneck.",
      learnability:
        "The easiest first language by far. Minimal syntax, no compilation step, REPL, Jupyter — you can be productive in hours. It's the right first language for most people.",
      ecosystem:
        "pip + PyPI has 500K+ packages. For ML: PyTorch, TF, JAX, scikit-learn. For web: Django, FastAPI. For data: pandas, polars, numpy, matplotlib. Unbeatable breadth.",
      concurrency:
        "The GIL (Global Interpreter Lock) prevents true thread parallelism for CPU work. asyncio is good for I/O bound concurrency. multiprocessing works but has overhead.",
    },
    famousProjects: ["Instagram (Django)", "Spotify (data pipeline)", "YouTube (originally)", "OpenAI GPT APIs", "NASA tooling", "Dropbox"],
    jobMarket: "very-high",
    salaryRange: "$105K–$170K",
  },

  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    year: 1995,
    creator: "Brendan Eich / Netscape",
    category: "web",
    categoryLabel: "Web",
    color: "#eab308",
    bgColor: "#130f00",
    performance: 6,
    memoryEfficiency: 5,
    learnability: 7,
    devSpeed: 7,
    ecosystem: 10,
    concurrency: 7,
    typeStrength: 2,
    performanceLabel: "Good — V8 JIT",
    memoryLabel: "Moderate — V8 managed",
    latency: "Event loop + GC pauses",
    gcModel: "V8 Mark-and-Sweep GC",
    typing: "Dynamic, Weakly Typed",
    paradigm: "Multi-paradigm + Event-driven",
    pros: [
      "Only language that runs natively in browsers",
      "Largest npm ecosystem (~2.5M packages)",
      "Full-stack possible with Node.js",
      "Async/event-driven model suits web well",
      "Massive job market",
      "V8 JIT makes it surprisingly fast",
      "No compilation step — instant feedback",
    ],
    cons: [
      "Type coercion produces bizarre results ([] + {} = '[object Object]')",
      "Dynamic typing hides bugs",
      "Ecosystem churn — tools change constantly",
      "Callback hell (mitigated by async/await)",
      "Security footguns in Node.js",
      "Single-threaded (event loop)",
    ],
    useCases: [
      "All frontend web development",
      "Node.js backend APIs",
      "React Native mobile apps",
      "Electron desktop apps",
      "Serverless / edge functions",
      "Browser extensions",
    ],
    notGoodFor: [
      "Systems programming",
      "CPU-intensive computation",
      "Type-safe large codebases (use TypeScript)",
    ],
    verdict:
      "Unavoidable if you touch the web. Quirky and inconsistent, but V8 is impressive engineering. Use TypeScript on top for anything serious.",
    tooltips: {
      performance:
        "V8's JIT compilation is genuinely impressive — it profiles hot paths and compiles them to optimized machine code. Node.js servers can handle high throughput but aren't for CPU-bound tasks.",
      memory:
        "V8 manages the heap automatically. Memory is reasonable for web workloads. Heavy apps with many closures and event listeners can leak if not careful.",
      latency:
        "Event loop model is non-blocking by design — good for I/O concurrency. GC pauses exist but V8 tunes them well. Long-running CPU tasks block the event loop.",
      learnability:
        "Easy to start, deep to master. Basic syntax is accessible but the async model, prototype chain, 'this' binding, and type coercion rules are confusing.",
      ecosystem:
        "npm has 2.5M+ packages — the largest in the world. React, Vue, Next.js, Express, NestJS, Vite... everything exists. The downside: quality varies wildly.",
      concurrency:
        "Single-threaded event loop with async/await. Worker Threads for true parallelism. For I/O concurrency it excels; for CPU parallelism it's limited.",
    },
    famousProjects: ["Netflix frontend", "Facebook (React)", "LinkedIn frontend", "Slack (Electron)", "VS Code (Electron)"],
    jobMarket: "very-high",
    salaryRange: "$100K–$160K",
  },

  {
    id: "typescript",
    name: "TypeScript",
    icon: "📘",
    year: 2012,
    creator: "Anders Hejlsberg / Microsoft",
    category: "web",
    categoryLabel: "Web",
    color: "#3b82f6",
    bgColor: "#00091a",
    performance: 6,
    memoryEfficiency: 5,
    learnability: 6,
    devSpeed: 7,
    ecosystem: 10,
    concurrency: 7,
    typeStrength: 8,
    performanceLabel: "Same as JavaScript",
    memoryLabel: "Same as JavaScript",
    latency: "Compiles to JS — same runtime",
    gcModel: "V8 GC (compiles to JS)",
    typing: "Static, Structural Typing",
    paradigm: "Multi-paradigm + Event-driven",
    pros: [
      "Static types catch entire categories of bugs before runtime",
      "Excellent IDE autocomplete and refactoring (IntelliSense)",
      "Structural typing is flexible and pragmatic",
      "Gradual adoption — superset of JS",
      "Massive industry adoption (React, Angular, Node)",
      "Type inference means less annotation needed",
    ],
    cons: [
      "Compiles to JS — runtime is still JavaScript",
      "Type system can become very complex at scale",
      "tsconfig overhead and build step",
      "'any' type is an escape hatch that defeats the purpose",
      "Generics can get obtuse for library authors",
    ],
    useCases: [
      "Large-scale frontend (React, Angular, Vue)",
      "Node.js backends at scale",
      "Monorepos and shared libraries",
      "SDKs and public APIs",
      "Enterprise JavaScript codebases",
    ],
    notGoodFor: [
      "Small scripts where types add more overhead than benefit",
      "Teams unfamiliar with static typing",
    ],
    verdict:
      "JavaScript with a seatbelt. If you're writing any serious project in JS, use TypeScript. The type errors you catch at compile time would've been 2AM production incidents.",
    tooltips: {
      performance:
        "TypeScript transpiles to JavaScript and runs on the same V8 engine. No performance difference at runtime — types are erased completely.",
      memory:
        "Same as JavaScript. No runtime overhead from the type system — it's purely a compile-time tool.",
      latency:
        "Identical to JavaScript at runtime. Build step adds latency to development cycle but not to production.",
      learnability:
        "If you know JavaScript, TypeScript takes 1–2 weeks to be productive. The type system has deep waters — advanced generics and conditional types take months to master.",
      ecosystem:
        "DefinitelyTyped (@types/*) provides types for almost every npm package. The ecosystem is essentially the same as JavaScript's. React, Next.js, NestJS all have first-class TS support.",
      concurrency:
        "Identical to JavaScript. Async/await, Worker Threads, and event-driven patterns all work the same.",
    },
    famousProjects: ["VS Code", "Angular framework", "Deno runtime", "Prisma ORM", "Vercel platform"],
    jobMarket: "very-high",
    salaryRange: "$110K–$165K",
  },

  {
    id: "go",
    name: "Go",
    icon: "🐹",
    year: 2009,
    creator: "Rob Pike, Ken Thompson / Google",
    category: "systems",
    categoryLabel: "Systems",
    color: "#06b6d4",
    bgColor: "#001518",
    performance: 8,
    memoryEfficiency: 8,
    learnability: 9,
    devSpeed: 8,
    ecosystem: 8,
    concurrency: 9,
    typeStrength: 7,
    performanceLabel: "Fast — compiled native",
    memoryLabel: "Low — efficient GC",
    latency: "Low — small GC pauses",
    gcModel: "Concurrent Tri-color GC",
    typing: "Static, Strongly Typed",
    paradigm: "Procedural + CSP Concurrency",
    pros: [
      "Easiest systems-level language to learn",
      "Goroutines make concurrency trivial and cheap",
      "Compiles to a single static binary — simple deployment",
      "Fast compilation times",
      "Built for cloud-native infrastructure",
      "Standard library is excellent and comprehensive",
      "Opinionated simplicity — one way to do things",
    ],
    cons: [
      "Verbose error handling (if err != nil everywhere)",
      "Generics only added in 1.18 — still limited",
      "Less expressive than Rust/C++",
      "GC pauses exist (small but nonzero)",
      "No OOP inheritance",
      "Can feel repetitive for complex domain logic",
    ],
    useCases: [
      "Cloud infrastructure (Docker, Kubernetes are Go)",
      "Microservices",
      "CLI tools",
      "High-throughput API servers",
      "DevOps / platform tooling",
      "Distributed systems",
    ],
    notGoodFor: [
      "Systems requiring absolute memory control",
      "Complex domain modeling (limited generics/type system)",
      "Data science / ML",
      "GUI applications",
    ],
    verdict:
      "Opinionated simplicity that scales. If Rust's complexity is too much and Python's speed isn't enough, Go is the answer. It's boring in the best possible way.",
    tooltips: {
      performance:
        "Go compiles to native binaries. Throughput often comparable to Java (sometimes better). The GC is tuned for low pause times. Great for server workloads.",
      memory:
        "Go is notably memory-efficient compared to JVM languages. Static binary, small goroutine stack (2KB, grows as needed), efficient GC. Much lighter than Java/Python.",
      latency:
        "Go's concurrent GC targets sub-millisecond pauses since Go 1.14. For most server use cases this is perfectly acceptable. Not suitable for hard real-time requirements.",
      learnability:
        "Go has a deliberately tiny spec. You can read the entire spec in an afternoon. Most developers are productive in Go within 1–2 weeks regardless of background.",
      ecosystem:
        "Go modules ecosystem is solid. The standard library covers a lot — HTTP, JSON, crypto, concurrency primitives. Third-party ecosystem is good but smaller than Java/JS.",
      concurrency:
        "Goroutines are the killer feature — lightweight threads (2KB stack) managed by the Go runtime. Channels for communication. CSP model makes concurrent code readable and safe.",
    },
    famousProjects: ["Docker", "Kubernetes", "Terraform", "Prometheus", "CockroachDB", "Cloudflare infrastructure"],
    jobMarket: "high",
    salaryRange: "$125K–$185K",
  },

  {
    id: "kotlin",
    name: "Kotlin",
    icon: "🎯",
    year: 2011,
    creator: "JetBrains",
    category: "enterprise",
    categoryLabel: "Enterprise",
    color: "#a855f7",
    bgColor: "#0c0015",
    performance: 7,
    memoryEfficiency: 4,
    learnability: 7,
    devSpeed: 7,
    ecosystem: 7,
    concurrency: 7,
    typeStrength: 9,
    performanceLabel: "Good — JVM JIT",
    memoryLabel: "Heavy — JVM",
    latency: "GC pauses",
    gcModel: "JVM GC",
    typing: "Static + Inferred, Strongly Typed",
    paradigm: "Multi-paradigm",
    pros: [
      "Null safety is built into the type system",
      "Far less boilerplate than Java",
      "100% Java interoperability",
      "Official Android development language",
      "Coroutines are excellent for async",
      "Extension functions are powerful",
      "Data classes, sealed classes out of the box",
    ],
    cons: [
      "JVM memory overhead (same as Java)",
      "Slower compile times than Java",
      "Kotlin Multiplatform still maturing",
      "Smaller community than Java",
      "Some features have a learning curve (coroutines, DSLs)",
    ],
    useCases: [
      "Android app development",
      "Spring Boot backends (JVM)",
      "Kotlin Multiplatform (iOS + Android)",
      "Ktor server framework",
      "Scripting (Kotlin Script)",
    ],
    notGoodFor: [
      "Systems programming",
      "Performance-critical applications",
      "Teams without JVM experience",
    ],
    verdict:
      "Java but actually enjoyable. JetBrains built the language they wished Java was. For Android and JVM work, Kotlin is the clear modern choice.",
    tooltips: {
      performance: "Runs on the JVM — same JIT performance as Java. Kotlin compiles to Java bytecode. Kotlin/Native compiles to native for Multiplatform use cases.",
      memory: "JVM overhead is the same as Java. No savings there. Kotlin's more concise code doesn't reduce runtime memory usage.",
      latency: "Same GC characteristics as Java. G1GC, ZGC options available. Coroutines are more memory-efficient than threads for I/O concurrency.",
      learnability: "Kotlin is an improvement on Java in almost every way. Java developers pick it up in days. For beginners, it's cleaner than Java to start with.",
      ecosystem: "Full access to the entire Maven Central Java ecosystem. Android ecosystem is deeply Kotlin-first. JetBrains actively invests in Kotlin tooling.",
      concurrency: "Kotlin Coroutines are elegant and structured concurrency is a first-class concept. Much better than Java's CompletableFuture model.",
    },
    famousProjects: ["All modern Android apps", "Gradle build system", "Spring (first-class Kotlin support)", "JetBrains IDEs"],
    jobMarket: "high",
    salaryRange: "$110K–$165K",
  },

  {
    id: "swift",
    name: "Swift",
    icon: "🐦",
    year: 2014,
    creator: "Chris Lattner / Apple",
    category: "general",
    categoryLabel: "General Purpose",
    color: "#f97316",
    bgColor: "#140800",
    performance: 9,
    memoryEfficiency: 9,
    learnability: 7,
    devSpeed: 7,
    ecosystem: 6,
    concurrency: 8,
    typeStrength: 9,
    performanceLabel: "Fast — ARC, near C++",
    memoryLabel: "Low — ARC (no GC)",
    latency: "Deterministic — ARC",
    gcModel: "ARC (Automatic Reference Counting)",
    typing: "Static + Inferred, Strongly Typed",
    paradigm: "Multi-paradigm",
    pros: [
      "Optionals eliminate null pointer exceptions",
      "ARC provides deterministic memory management without a GC",
      "Modern, expressive syntax",
      "SwiftUI for declarative UI development",
      "Performance near C++ in benchmarks",
      "Excellent Xcode and toolchain integration",
      "Swift Concurrency (actors, async/await) is well-designed",
    ],
    cons: [
      "Practically limited to Apple ecosystem",
      "Linux/Windows support is second-class",
      "Server-side ecosystem is thin",
      "Tightly coupled to Apple toolchain",
      "ABI was unstable for years (now stable)",
      "Less relevant for cross-platform work",
    ],
    useCases: [
      "iOS / iPadOS apps",
      "macOS apps",
      "watchOS / tvOS / visionOS",
      "Swift on Server (Vapor framework)",
      "SwiftUI cross-Apple-platform UI",
    ],
    notGoodFor: [
      "Cross-platform development outside Apple",
      "Web development",
      "Data science",
      "Android",
    ],
    verdict:
      "An excellent language with a portability problem. If you're in Apple's ecosystem, it's a joy. Outside it, you'll be fighting toolchain issues on every non-Mac platform.",
    tooltips: {
      performance: "Swift compiles to native code via LLVM. Benchmarks consistently put it within 10% of C++. ARC is faster than GC for most workloads due to determinism.",
      memory: "ARC frees memory immediately when reference count drops to zero — no GC pause. Memory use is lean and predictable. Watch for retain cycles with closures.",
      latency: "ARC provides deterministic deallocation — no GC pause spikes. Latency is as predictable as C++. Great for game loops and real-time rendering.",
      learnability: "Clean syntax with good safety rails. The type system is strict but helpful. Swift Concurrency (actors, async/await) can be confusing at first.",
      ecosystem: "Apple platform libraries are world-class. Server-side (Vapor) is functional but thin. Outside Apple, the ecosystem doesn't compare to Java/Python.",
      concurrency: "Swift Concurrency with actors and structured concurrency is a modern, well-designed model. Xcode integration for async debugging is good.",
    },
    famousProjects: ["All Apple system apps", "Airbnb (iOS)", "Lyft (iOS)", "Vapor web framework"],
    jobMarket: "medium",
    salaryRange: "$120K–$175K",
  },

  {
    id: "ruby",
    name: "Ruby",
    icon: "💎",
    year: 1995,
    creator: "Yukihiro Matsumoto",
    category: "scripting",
    categoryLabel: "Scripting",
    color: "#ef4444",
    bgColor: "#140000",
    performance: 3,
    memoryEfficiency: 3,
    learnability: 8,
    devSpeed: 9,
    ecosystem: 6,
    concurrency: 4,
    typeStrength: 3,
    performanceLabel: "Slow — ~10x slower than Go",
    memoryLabel: "High",
    latency: "High",
    gcModel: "Mark-and-Sweep GC",
    typing: "Dynamic, Strongly Typed",
    paradigm: "OOP + Functional",
    pros: [
      "Most readable, human-like syntax of any language",
      "Rails is extraordinarily productive for web apps",
      "Convention over configuration reduces decisions",
      "Metaprogramming is powerful (DSLs)",
      "Developer happiness is a stated design goal",
      "Great for startups and MVPs",
    ],
    cons: [
      "Slow — one of the slowest mainstream languages",
      "High memory usage",
      "GIL limits true threading",
      "Declining popularity and market share",
      "Magic in Rails can make debugging difficult",
      "Dynamic typing hides errors until runtime",
    ],
    useCases: [
      "Web apps (Ruby on Rails)",
      "Startup MVPs and prototypes",
      "E-commerce platforms (Shopify)",
      "DevOps scripting (Chef, Puppet)",
      "API backends",
    ],
    notGoodFor: [
      "Performance-critical systems",
      "Large-scale data processing",
      "Mobile development",
      "Latency-sensitive services",
    ],
    verdict:
      "Optimized for developer happiness over machine happiness. Rails was revolutionary. Python and Node have captured most of its market, but Shopify proves it scales.",
    tooltips: {
      performance: "CRuby (MRI) is slow. YJIT (added in Ruby 3.1) significantly improves performance — up to 2-3x speedup. Still not competing with Go or Java.",
      memory: "Ruby objects have high memory overhead. Rails apps are memory-intensive. Scaling often requires tuning Puma workers carefully.",
      latency: "GC pauses and interpreted overhead make Ruby unsuitable for real-time or low-latency requirements.",
      learnability: "Ruby reads beautifully. Beginners can be productive quickly. Rails has a lot of magic to learn but scaffolding gets you started fast.",
      ecosystem: "RubyGems ecosystem is solid for web. Rails is mature. Outside web, the ecosystem is thinner than Python or Node.",
      concurrency: "GIL limits threads. Ractors (Ruby 3) are an experimental solution. For concurrency, Ruby isn't the best choice.",
    },
    famousProjects: ["GitHub (originally Rails)", "Shopify", "Airbnb (originally Rails)", "Basecamp", "Twitch (originally Rails)"],
    jobMarket: "medium",
    salaryRange: "$95K–$150K",
  },

  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    year: 1994,
    creator: "Rasmus Lerdorf",
    category: "web",
    categoryLabel: "Web",
    color: "#6366f1",
    bgColor: "#05050f",
    performance: 5,
    memoryEfficiency: 5,
    learnability: 8,
    devSpeed: 7,
    ecosystem: 8,
    concurrency: 3,
    typeStrength: 5,
    performanceLabel: "Moderate — PHP 8 JIT",
    memoryLabel: "Moderate",
    latency: "Moderate",
    gcModel: "Reference Counting + cyclic GC",
    typing: "Dynamic (optional strict types)",
    paradigm: "Multi-paradigm",
    pros: [
      "Powers 75%+ of all websites (WordPress, Drupal)",
      "Extremely cheap and ubiquitous shared hosting",
      "Laravel is a genuinely excellent framework",
      "Low barrier to entry — easy to deploy",
      "PHP 8 is a significant improvement over legacy PHP",
      "Massive CMS ecosystem",
    ],
    cons: [
      "Historical inconsistency in standard library naming",
      "Legacy codebase reputation is earned",
      "Not designed for non-web use cases",
      "Dynamic typing + weak coercion causes bugs",
      "Mocked in developer culture (sometimes unfairly)",
      "No native async — Swoole/ReactPHP are workarounds",
    ],
    useCases: [
      "WordPress / CMS development",
      "Laravel web applications",
      "E-commerce (Magento, WooCommerce)",
      "Shared hosting web sites",
      "Facebook's HHVM/Hack origin",
    ],
    notGoodFor: [
      "Systems programming",
      "Real-time applications",
      "CLI tools",
      "Data science",
    ],
    verdict:
      "Much better than its reputation. PHP 8 with strict types and Laravel is a modern, capable stack. The internet runs on PHP whether developers want to admit it or not.",
    tooltips: {
      performance: "PHP 8 added a JIT compiler. Performance has improved significantly. For typical web workloads (DB queries + rendering), it's fast enough. Not for CPU-bound tasks.",
      memory: "PHP-FPM handles each request in isolation — memory is released per request. This is actually a clean model, though it has overhead per connection.",
      latency: "Request-response model means each request spins up fresh. Shared-nothing architecture is simple but adds per-request overhead vs long-lived servers.",
      learnability: "PHP is easy to start — embed it in HTML and it works. The inconsistencies in the standard library are frustrating but documented. Laravel helps.",
      ecosystem: "Composer and Packagist are solid. Laravel, Symfony, WordPress, Magento — mature ecosystem for web. Thin outside web.",
      concurrency: "PHP is synchronous by default. Swoole or ReactPHP add async capabilities but aren't mainstream. Not PHP's strength.",
    },
    famousProjects: ["WordPress (43% of all websites)", "Facebook (originally, now Hack)", "Wikipedia (MediaWiki)", "Slack (originally PHP)"],
    jobMarket: "high",
    salaryRange: "$80K–$135K",
  },

  {
    id: "scala",
    name: "Scala",
    icon: "♾️",
    year: 2004,
    creator: "Martin Odersky / EPFL",
    category: "enterprise",
    categoryLabel: "Enterprise",
    color: "#dc2626",
    bgColor: "#140000",
    performance: 7,
    memoryEfficiency: 4,
    learnability: 2,
    devSpeed: 5,
    ecosystem: 6,
    concurrency: 8,
    typeStrength: 10,
    performanceLabel: "Good — JVM JIT",
    memoryLabel: "Heavy — JVM",
    latency: "GC pauses",
    gcModel: "JVM GC",
    typing: "Static, Extremely Strong + Inferred",
    paradigm: "FP + OOP fusion",
    pros: [
      "Most powerful type system in mainstream languages",
      "Excellent FP support — immutable by default",
      "Apache Spark is written in Scala — Big Data standard",
      "Pattern matching is expressive",
      "Akka actors for distributed systems",
      "Concise expressive code when used well",
    ],
    cons: [
      "Notoriously steep learning curve",
      "Compile times are legendarily slow",
      "JVM overhead",
      "Too many ways to solve problems",
      "Small community relative to Java",
      "Advanced type features are hard to reason about",
    ],
    useCases: [
      "Apache Spark / Big Data pipelines",
      "Distributed systems (Akka)",
      "Financial systems with complex domain logic",
      "Pure functional programming",
      "Compiler design",
    ],
    notGoodFor: [
      "Quick web development",
      "Teams without FP experience",
      "Applications requiring fast iteration",
    ],
    verdict:
      "An intellectually rewarding language with a punishing learning curve. If you need Spark or love dependent types and pure FP, it earns its complexity. Otherwise the cost is very high.",
    tooltips: {
      performance: "JVM performance — same JIT advantages and GC overhead as Java. Immutability can cause extra allocations but functional style enables parallelism.",
      memory: "JVM heap plus Scala's preference for immutable data structures means higher memory use than mutable Java code.",
      latency: "JVM GC is the bottleneck. Same issues as Java. Akka actors help with throughput but not raw latency.",
      learnability: "Scala 2's complexity was infamous. Scala 3 (Dotty) improved but the language still has enormous depth. Expect 6+ months to be truly productive.",
      ecosystem: "Spark and Akka are the killer apps. Outside those, the ecosystem is smaller than Java. Cats and ZIO for FP are powerful but complex.",
      concurrency: "Akka actors are excellent for distributed systems. Cats Effect and ZIO provide purely functional concurrency models.",
    },
    famousProjects: ["Apache Spark", "Kafka (originally Scala)", "Akka", "Twitter (originally Scala)", "LinkedIn (Kafka)"],
    jobMarket: "medium",
    salaryRange: "$130K–$190K",
  },

  {
    id: "dart",
    name: "Dart",
    icon: "🎪",
    year: 2011,
    creator: "Lars Bak, Kasper Lund / Google",
    category: "general",
    categoryLabel: "General Purpose",
    color: "#06b6d4",
    bgColor: "#001215",
    performance: 7,
    memoryEfficiency: 6,
    learnability: 7,
    devSpeed: 8,
    ecosystem: 6,
    concurrency: 6,
    typeStrength: 8,
    performanceLabel: "Good — AOT + JIT",
    memoryLabel: "Moderate",
    latency: "Low (AOT mode)",
    gcModel: "Generational GC",
    typing: "Static + Inferred, Sound Null Safety",
    paradigm: "OOP + Functional",
    pros: [
      "Flutter — beautiful, fast cross-platform UI",
      "AOT compilation for fast startup",
      "Sound null safety — no NullPointerExceptions",
      "Hot reload in Flutter development",
      "Single codebase for iOS, Android, Web, Desktop",
      "Clean, readable syntax",
    ],
    cons: [
      "Relevant almost exclusively via Flutter",
      "Small ecosystem outside Flutter",
      "Community smaller than Swift/Kotlin",
      "Google could deprecate it (history of killing products)",
      "Server-side story is weak",
    ],
    useCases: [
      "Flutter cross-platform mobile apps",
      "Flutter for desktop",
      "Flutter web apps",
    ],
    notGoodFor: [
      "Backend services",
      "Data science",
      "Systems programming",
      "Projects not using Flutter",
    ],
    verdict:
      "Dart is Flutter's language and Flutter is genuinely excellent. If you need beautiful, performant cross-platform apps from one codebase, this combo is compelling. Otherwise, limited relevance.",
    tooltips: {
      performance: "Dart compiles to native ARM code (AOT) for mobile — fast startup and smooth 60/120fps UI. JIT mode for development enables hot reload.",
      memory: "Generational GC. Flutter apps are generally memory-efficient. AOT mode eliminates JIT overhead.",
      latency: "AOT compilation gives predictable, low-latency execution. No JIT warmup. GC pauses exist but Flutter UI threading handles this well.",
      learnability: "Clean Java-like syntax with modern features. If you know any OOP language, Dart is learnable in days. Flutter takes longer.",
      ecosystem: "pub.dev has 40K+ packages but almost all are Flutter-focused. Server-side (Dart Frog, Shelf) is functional but thin.",
      concurrency: "Dart uses an isolate model — separate memory heaps that communicate via message passing. No shared-state concurrency by default.",
    },
    famousProjects: ["Flutter SDK", "Google Pay (Flutter)", "eBay Motors (Flutter)", "BMW app (Flutter)"],
    jobMarket: "medium",
    salaryRange: "$100K–$150K",
  },
];

export const categoryColors: Record<string, string> = {
  systems: "#f97316",
  web: "#eab308",
  enterprise: "#8b5cf6",
  scripting: "#22c55e",
  general: "#06b6d4",
};

export const metricLabels: Record<string, string> = {
  performance: "Performance",
  memoryEfficiency: "Memory Efficiency",
  learnability: "Learnability",
  devSpeed: "Dev Speed",
  ecosystem: "Ecosystem",
  concurrency: "Concurrency",
  typeStrength: "Type Safety",
};
