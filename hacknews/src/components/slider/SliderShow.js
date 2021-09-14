import { useCallback, useEffect, useRef } from "react";
import Next from '../../assets/img/next.svg';
import Previous from '../../assets/img/previous.svg';

function SliderShow({children }) {
    const slider = useRef(null);
    const interval = useRef(null);

    const nextItem = useCallback(() => {
		if (slider.current.children.length > 0) {
			slider.current.children[0].style.transition = `500ms ease-out all`;
			slider.current.children[0].style.transform = 'translateX(-1px)';

			const transition = () => {
				slider.current.children[0].style.transition = 'none';
				slider.current.children[0].style.transform = 'translateX(1px)';

				slider.current.appendChild(slider.current.children[0]);

				slider.current.removeEventListener('transitionend', transition);
			};
			slider.current.addEventListener('transitionend', transition);
		}
	}, []);

	const previousItem = () => {
		const index = slider.current.children.length - 2;

		if (slider.current.children.length > 1) {
			slider.current.insertBefore(
				slider.current.children[index],
				slider.current.firstChild
			);
			slider.current.children[index].style.transition = 'none';
			slider.current.children[index].style.transform = 'translateX(1px)';

			setTimeout(() => {
				slider.current.children[index].style.transition =
					'300ms ease-out all';
				slider.current.children[index].style.transform =
					'translateX(1px)';
			}, 30);
		}
	};

	useEffect(() => {
		interval.current = setInterval(() => {
			nextItem();
		}, 360000);
		slider.current.addEventListener('mouseenter', () => {
			clearInterval(interval.current);
		});
		slider.current.addEventListener('mouseleave', () => {
			interval.current = setInterval(() => {
				nextItem();
			}, 360000);
		});
	}, [nextItem]);

    return (
        <div>
            <div className="sliderList" ref={slider}>{children}
                <div>
                    <img className="previous" src={Previous} alt="previous" onClick={previousItem}/>
                    <img className="next" src={Next} alt="next" onClick={nextItem}/>
                </div>
            </div>
        </div>
    )
}

export default SliderShow;