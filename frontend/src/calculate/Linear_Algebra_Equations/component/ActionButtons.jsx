// src/calculate/Linear_Algebra_Equations/component/ActionButtons.jsx

function ActionButtons({ onCalculate, onClear }) {
    return (
        <div style={{ 
            marginBottom: '20px', 
            display: 'flex', 
            gap: '10px' 
        }}>
            <button
                onClick={onCalculate}
                style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#000dff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0008cc'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#000dff'}
            >
                Calculate
            </button>
            <button
                onClick={onClear}
                style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
                Clear
            </button>
        </div>
    );
}

export default ActionButtons;