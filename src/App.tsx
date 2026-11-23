import { dishes, hours, hoursNote, restaurant } from './content';
import { orderUrl } from './order-link';

const FOCUS =
  'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-chilli';

const BUTTON = {
  base: `inline-flex items-center justify-center rounded-md font-semibold ${FOCUS}`,
  size: { md: 'px-5 py-3 text-lg', sm: 'px-4 py-2 text-base' },
};

function OrderNow({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const classes = `${BUTTON.base} ${BUTTON.size[size]}`;

  if (orderUrl === null) {
    return (
      <span
        aria-disabled="true"
        title="The ordering link is not configured for this site."
        className={`${classes} cursor-not-allowed bg-steel-line text-ink/70`}
      >
        Order Now
      </span>
    );
  }

  return (
    <a
      href={orderUrl}
      className={`${classes} bg-leaf text-board shadow-[0_3px_0_var(--color-ink)] transition-transform hover:-translate-y-px active:translate-y-0.5 active:shadow-none motion-reduce:transition-none`}
    >
      Order Now
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-steel-line bg-steel/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <a href="#top" className={`font-display text-xl text-leaf ${FOCUS}`}>
          {restaurant.name}
        </a>
        <OrderNow size="sm" />
      </div>
    </header>
  );
}

/** The one loud element: the shop's painted signboard. */
function Signboard() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-4 pt-6 sm:px-8 sm:pt-10">
      <div className="rounded-sm bg-board p-2 shadow-[0_18px_40px_-24px_var(--color-ink)] sm:p-3">
        <div className="border-[6px] border-leaf px-5 py-8 outline-2 -outline-offset-[14px] outline-chilli sm:px-12 sm:py-14">
          <p className="text-lg font-semibold text-leaf">
            {restaurant.area}. Since {restaurant.since}.
          </p>
          <h1 className="mt-3 font-display text-[clamp(3.25rem,13vw,8.5rem)] leading-[0.92] text-leaf">
            {restaurant.signboard.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[34rem] text-xl leading-relaxed text-ink">{restaurant.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <OrderNow />
            <span className="text-base text-ink">Order for pickup. Pay online, collect at the counter.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dishes() {
  return (
    <section aria-labelledby="dishes" className="mx-auto max-w-5xl px-4 pt-16 sm:px-8 sm:pt-24">
      <h2 id="dishes" className="font-display text-4xl text-leaf sm:text-5xl">
        What people come for
      </h2>
      <p className="mt-2 text-lg text-ink/80">
        Prices and what is available today are on the ordering page.
      </p>
      <ul className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
        {dishes.map((dish) => (
          <li key={dish.name} className="border-l-4 border-board pl-4">
            <h3 className="text-xl font-semibold text-ink">{dish.name}</h3>
            <p className="mt-1 text-lg leading-relaxed text-ink/80">{dish.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HowToOrder() {
  return (
    <section aria-labelledby="ordering" className="mx-auto max-w-5xl px-4 pt-16 sm:px-8 sm:pt-24">
      <h2 id="ordering" className="font-display text-4xl text-leaf sm:text-5xl">
        Ordering
      </h2>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-ink">Sitting at a table</h3>
          <p className="mt-2 max-w-[32rem] text-lg leading-relaxed text-ink/80">
            Scan the QR code on your table to open the menu on your phone. Your server confirms the
            table once, and then you can order as many rounds as you like. Pay when you leave.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-ink">Picking up</h3>
          <p className="mt-2 max-w-[32rem] text-lg leading-relaxed text-ink/80">
            Order Now opens our take-away menu. Pay online, keep the token number you get, and
            collect your order at the counter when it is called.
          </p>
          <div className="mt-5">
            <OrderNow />
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.name}, ${restaurant.address.join(', ')}`,
  )}`;

  return (
    <section aria-labelledby="visit" className="mx-auto max-w-5xl px-4 pt-16 sm:px-8 sm:pt-24">
      <h2 id="visit" className="font-display text-4xl text-leaf sm:text-5xl">
        Visit
      </h2>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div>
          <address className="text-lg leading-relaxed not-italic text-ink">
            {restaurant.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-lg">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold text-leaf underline underline-offset-4 ${FOCUS}`}
            >
              Get directions
            </a>
            <a
              href={restaurant.phoneHref}
              className={`font-semibold text-leaf underline underline-offset-4 ${FOCUS}`}
            >
              Call {restaurant.phoneDisplay}
            </a>
          </div>
        </div>
        <div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-lg">
            {hours.map((slot) => (
              <div key={slot.label} className="contents">
                <dt className="font-semibold text-ink">{slot.label}</dt>
                <dd className="text-ink/80">{slot.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-lg text-ink/80">{hoursNote}</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-20 max-w-5xl border-t border-steel-line px-4 py-8 text-base text-ink/70 sm:px-8">
      <p>
        {restaurant.name}, {restaurant.area}. Online ordering runs on SOBOS.
      </p>
    </footer>
  );
}

export function App() {
  return (
    <div className="min-h-screen bg-steel font-body text-ink antialiased">
      <Header />
      <main>
        <Signboard />
        <Dishes />
        <HowToOrder />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
