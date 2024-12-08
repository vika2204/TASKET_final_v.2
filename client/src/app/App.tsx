import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router";
import store from "@/app/store/store.ts";


export function App(): JSX.Element {
  return (
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    )
}
