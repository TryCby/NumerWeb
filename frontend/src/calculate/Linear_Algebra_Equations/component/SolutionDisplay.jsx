// src/calculate/Linear_Algebra_Equations/component/SolutionDisplay.jsx
import { MathJax } from 'better-react-mathjax';

function SolutionDisplay({ latex }) {
    if (!latex) return null;

    return (
        <div style={{
            padding: '30px',
            backgroundColor: '#f8f9fa',
            border: '2px solid #dee2e6',
            borderRadius: '8px',
            marginTop: '20px',
            overflowX: 'auto'
        }}>
            <h3 style={{ 
                marginBottom: '20px', 
                color: '#495057',
                fontSize: '22px',
                fontWeight: 'bold'
            }}>
                Solution
            </h3>
            <MathJax dynamic hideUntilTypeset="first">
                {`$$${latex}$$`}
            </MathJax>
        </div>
    );
}

export default SolutionDisplay;