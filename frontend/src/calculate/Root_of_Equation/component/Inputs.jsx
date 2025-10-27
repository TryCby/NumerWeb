function Inputs({ inputs, onChange, onCalculate, methodType }) {
    const styles = {
        container: {
            padding: '20px',
            border: '1px solid #ccc',
            marginBottom: '20px',
        },
        inputGroup: {
            marginBottom: '10px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#000dff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
        }
    };

    // Validation แบบง่าย
    const validate = () => {
        if (!inputs.fx?.trim()) return alert('กรุณากรอกสมการ f(x)');

        if (methodType === 'bracket') {
            const xl = parseFloat(inputs.xl);
            const xr = parseFloat(inputs.xr);
            if (!inputs.xl || !inputs.xr) return alert('กรุณากรอกค่า XL และ XR');
            if (isNaN(xl) || isNaN(xr)) return alert('XL และ XR ต้องเป็นตัวเลข');
            if (xl >= xr) return alert('XL ต้องน้อยกว่า XR');
        }

        if (methodType === 'open-single') {
            if (!inputs.xi) return alert('กรุณากรอกค่า Xi');
            if (isNaN(parseFloat(inputs.xi))) return alert('Xi ต้องเป็นตัวเลข');
        }

        if (methodType === 'open-double') {
            if (!inputs.x0 || !inputs.x1) return alert('กรุณากรอกค่า X0 และ X1');
            if (isNaN(parseFloat(inputs.x0)) || isNaN(parseFloat(inputs.x1))) {
                return alert('X0 และ X1 ต้องเป็นตัวเลข');
            }
        }

        if (methodType !== 'graphical') {
            if (!inputs.error || parseFloat(inputs.error) <= 0) {
                return alert('กรุณากรอกค่า Error Tolerance ที่มากกว่า 0');
            }
        }

        return true;
    };

    const handleCalculate = () => {
        if (validate()) onCalculate();
    };

    // Component สำหรับ Input Field
    const Field = ({ label, name, type = "text", placeholder, step }) => (
        <div style={styles.inputGroup}>
            <label style={styles.label}>{label}:</label>
            <input
                type={type}
                name={name}
                value={inputs[name] || ''}
                onChange={onChange}
                style={styles.input}
                placeholder={placeholder}
                step={step}
                min={type === 'number' ? '0' : undefined}
            />
        </div>
    );

    return (
        <div style={styles.container}>
            <Field label="f(x)" name="fx" placeholder="เช่น x^2-4" />

            {methodType === 'bracket' && (
                <>
                    <Field label="XL" name="xl" type="number" step="any" />
                    <Field label="XR" name="xr" type="number" step="any" />
                </>
            )}

            {methodType === 'open-single' && (
                <Field label="Initial X (Xi)" name="xi" type="number" step="any" />
            )}

            {methodType === 'open-double' && (
                <>
                    <Field label="X0" name="x0" type="number" step="any" />
                    <Field label="X1" name="x1" type="number" step="any" />
                </>
            )}

            {methodType !== 'graphical' && (
                <Field label="Error Tolerance" name="error" type="number" step="0.000001" />
            )}

            <button 
                onClick={handleCalculate} 
                style={styles.button}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0008cc'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#000dff'}
            >
                Calculate
            </button>
        </div>
    );
}

export default Inputs;