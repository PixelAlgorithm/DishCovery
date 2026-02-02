import React from 'react';
import Typed from 'typed.js';

function Typing() {
    const el = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                '<span class="typed-title">HCOVERY</span>',
                '<span class="typed-subtitle">COVER NEW RECEPIES.</span>'
            ],
            typeSpeed: 55,
            backSpeed:50,
            backDelay:50,
            loop: true,
            cursorChar:''
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="typing-wrapper">
            <span ref={el} />
        </div>
    );
}

export default Typing;