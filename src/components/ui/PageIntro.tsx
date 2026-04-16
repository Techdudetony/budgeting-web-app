type PageIntroProps = {
  title: string;
  description: string;
};

/* Standard page introduction block used at the top of feature pages. */
export default function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="page-intro">
      <h1 className="page-intro__title">{title}</h1>
      <p className="page-intro__description">{description}</p>
    </section>
  );
}
