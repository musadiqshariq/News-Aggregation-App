import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRouter } from "./routes";

function App() {
  return (
    <Provider store={store}>
      <div className="font-segoe">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
