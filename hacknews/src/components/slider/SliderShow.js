import { useCallback, useEffect, useRef } from "react";
import Next from '../../assets/img/next.svg';
import Previous from '../../assets/img/previous.svg';

function SliderShow({children }) {
    const slider = useRef(null);
    const interval = useRef(null);

    const nextItem = useCallback(() => {
        console.log("next");
        const firstItem = slider.current.children[0];
        
        if (slider.current.children.length > 0) {

            firstItem.style.transition = `500ms ease-out all`;
            firstItem.style.transform = 'translateX(-1px)';
            
            const transition = () => {
                firstItem.style.transition = 'none';
                firstItem.style.transform = 'translateX(1px)';

                slider.current.appendChild(firstItem);

                slider.current.removeEventListener('transitionend', transition);
            }
            slider.current.addEventListener('transitionend', transition);
        }
    }, []);

    const previousItem = () => {
        console.log("previous");
        const index = slider.current.children.length - 2;
        const lastItem = slider.current.children[index];
    
        if (slider.current.children.length > 0) {

            slider.current.insertBefore(lastItem, slider.current.firstChild);
            lastItem.style.transition = 'none';
            lastItem.style.transform = 'translateX(1px)';

            setTimeout(() => {
                lastItem.style.transition = '300ms ease-out all';
                lastItem.style.transform = 'translateX(1px)';
            }, 30);
        }
    }

    useEffect(() => {
        interval.current = setInterval(() => {
            nextItem();
        }, 3600000);
        slider.current.addEventListener('mouseenter', () => {
            clearInterval(interval.current);
        });
        slider.current.addEventListener('mouseleave', () => {
            interval.current = setInterval(() => {
                nextItem();
            }, 3600000);
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