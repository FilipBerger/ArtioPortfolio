import { FocusProps } from "../../interfaces.tsx"
import "./Focus.css"

const Focus: React.FC<FocusProps> = ({ src, alt }) => {
    
    const handleClick = () => {
        
    }
    return (
        <div className="focus-container">
            <img className="focus" src={src} alt={alt} onClick={handleClick}/>
        </div>
    )
}

export default Focus