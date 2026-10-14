// Shown when the URL does not match any page.

import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";

export default function NotFoundPage() {
  return (
    <Container className="flex flex-col items-start gap-6 py-24">
      <h1 className="font-heading text-5xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="max-w-xl text-lg text-ink-soft">
        The page you are looking for does not exist or has moved. Let's get you
        back on track.
      </p>
      <Button to="/">Back to Home</Button>
    </Container>
  );
}
