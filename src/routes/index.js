import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import { Guardian, Home, NewYorkTimes } from "../modules";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newyork-times" element={<NewYorkTimes />} />
          <Route path="/guardian" element={<Guardian />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
