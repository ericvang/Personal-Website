declare module 'hpp' {
  const middleware: () => import('express').RequestHandler;
  export = middleware;
} 