import { useAccordionButton } from "react-bootstrap";

export function CustomToggle({
  children,
  eventKey,
}: {
  children: React.ReactNode;
  eventKey: string;
}) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <button type="button" onClick={decoratedOnClick}>
      {children}
    </button>
  );
}
