/** Design intent: Editorial Trust System — a typed public-site router with consistent branded page frames. */
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";
import Process from "./pages/Process";
import Services from "./pages/Services";
import TrustSecurity from "./pages/TrustSecurity";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/stories" component={CaseStudies} />
      <Route path="/process" component={Process} />
      <Route path="/insights" component={Insights} />
      <Route path="/insights/:slug" component={InsightArticle} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/trust-security" component={TrustSecurity} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
