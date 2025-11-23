import { createRootRoute, Link } from "@tanstack/react-router";
import page1 from "./page1";
import page2 from "./page2";
import blog from "./blog";
import { createTree } from "../router";

export const rootRoute = createRootRoute({
    notFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <Link to="/">Go home</Link>
      </div>
    )
  },
});

export const routeTree = createTree(rootRoute,
  page1,
  page2,
  blog
)