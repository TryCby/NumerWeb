// src/calculate/Linear_Algebra_Equations/component/MatrixSizeSelector.jsx

function MatrixSizeSelector({ size, onSizeChange }) {
    return (
        <div style={{ 
            marginBottom: '20px', 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
        }}>
            <label style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginRight: '10px' 
            }}>
                Matrix Size (n×n):
            </label>
            <select 
                value={size} 
                onChange={onSizeChange}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                }}
            >
                {[2, 3, 4].map(n => (
                    <option key={n} value={n}>{n}×{n}</option>
                ))}
            </select>
        </div>
    );
}

export default MatrixSizeSelector;