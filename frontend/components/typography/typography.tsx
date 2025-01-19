export function TypographyH1({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
        </h1>
    );
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    );
}

export function TypographyH3({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h3>
    );
}

export function TypographyBlockquote({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
        </blockquote>
    );
}
