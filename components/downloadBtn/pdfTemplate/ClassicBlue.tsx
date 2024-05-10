import { forwardRef, ForwardedRef } from "react";

const ClassicBlue = forwardRef(
    (props: { btnLocation: string }, ref: ForwardedRef<HTMLDivElement>) => (
        <div ref={ref}>
            <h1>Contenuto da stampare</h1>
			<h1>Sono Classic BLue</h1>

        </div>
    )
);

export default ClassicBlue