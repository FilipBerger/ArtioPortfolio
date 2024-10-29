import { MiniatureProps } from "../../interfaces.tsx"
import "./Miniature.css"

const Miniature: React.FC<MiniatureProps> = ({ src, alt }) => {
    return (
        <div className="miniature-container">
            <img src={src} alt={alt} />
        </div>
    )
}

export default Miniature