declare global {
  namespace Deno {
    namespace env {
      function get(key: string): string | undefined;
    }
  }
}

// Type declarations for Deno std library
declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response>): void;
}

declare module "std/http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response>): void;
}

// Workaround for TypeScript module resolution
declare module "*http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response>): void;
}

export {};
