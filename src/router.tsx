import {
  type AnyRoute,
  createRouter,
  RouterProvider as TanRouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./pages";

// Custom createTree function for building route trees
export function createTree(
  parent: AnyRoute,
  ...routes: ((parent: AnyRoute) => AnyRoute)[]
) {
  return parent.addChildren(routes.map(route => route(parent)));
}

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterProvider() {
  return <TanRouterProvider router={router} />;
}