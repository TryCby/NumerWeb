import { useState } from "react";
import ComingSoon from './ComingSoon';

// Root of Equation Methods
import GraphicalUI from '../calculate/Root_of_Equation/ui/Graphical';
import BisectionUI from '../calculate/Root_of_Equation/ui/Bisection';
import FalsePositionUI from '../calculate/Root_of_Equation/ui/FalsePosition';
import OnePointUI from '../calculate/Root_of_Equation/ui/OnePoint';
import NewtonRaphsonUI from '../calculate/Root_of_Equation/ui/NewtonRaphson';
import SecantUI from '../calculate/Root_of_Equation/ui/Secant';

// Linear Algebra Equations Methods
import CramerRuleUI from '../calculate/Linear_Algebra_Equations/ui/CramerRule';
import GaussEliminationUI from '../calculate/Linear_Algebra_Equations/ui/GaussElimination';
import GaussJordanUI from '../calculate/Linear_Algebra_Equations/ui/GaussJordan';
import MatrixInversionUI from '../calculate/Linear_Algebra_Equations/ui/MatrixInversion';
import LU_DecompositionUI from '../calculate/Linear_Algebra_Equations/ui/LU_Decomposition';
import CholeskyUI from '../calculate/Linear_Algebra_Equations/ui/Cholesky';
import JacobiUI from '../calculate/Linear_Algebra_Equations/ui/Jacobi';
import GaussSeidelUI from '../calculate/Linear_Algebra_Equations/ui/GaussSeidel';
import ConjugateGradientUI from '../calculate/Linear_Algebra_Equations/ui/ConjugateGradient';

function Selector() {
    const [problemType, setProblemType] = useState("");
    const [method, setMethod] = useState("");

    const problemTypes = {
        "": [],
        "Root_of_Equation": [
            { value: "Graphical", label: "Graphical Method" },
            { value: "Bisection", label: "Bisection Method" },
            { value: "FalsePosition", label: "False-Position Method" },
            { value: "OnePoint", label: "One-Point Iteration Method" },
            { value: "NewtonRaphson", label: "Newton-Raphson Method" },
            { value: "Secant", label: "Secant Method" }
        ],
        "Linear_Algebra_Equations": [
            { value: "CramerRule", label: "Cramer's Rule" },
            { value: "GaussElimination", label: "Gauss Elimination" },
            { value: "GaussJordan", label: "Gauss-Jordan Method" },
            { value: "MatrixInversion", label: "Matrix Inversion" },
            { value: "LU_Decomposition", label: "LU Decomposition" },
            { value: "Cholesky", label: "Cholesky Decomposition" },
            { value: "Jacobi", label: "Jacobi Iteration" },
            { value: "GaussSeidel", label: "Gauss-Seidel Iteration" },
            { value: "ConjugateGradient", label: "Conjugate Gradient" }
        ]
    };

    const handleProblemTypeChange = (event) => {
        setProblemType(event.target.value);
        setMethod("");
    };

    const handleMethodChange = (event) => {
        setMethod(event.target.value);
    };

    const renderMethodComponent = () => {
        if (!method) return null;

        // Root of Equation Methods
        if (method === 'Graphical') return <GraphicalUI />;
        if (method === 'Bisection') return <BisectionUI />;
        if (method === 'FalsePosition') return <FalsePositionUI />;
        if (method === 'OnePoint') return <OnePointUI />;
        if (method === 'NewtonRaphson') return <NewtonRaphsonUI />;
        if (method === 'Secant') return <SecantUI />;

        // Linear Algebra Equations Methods
        if (method === 'CramerRule') return <CramerRuleUI />;
        if (method === 'GaussElimination') return <GaussEliminationUI />;
        if (method === 'GaussJordan') return <GaussJordanUI />;
        if (method === 'MatrixInversion') return <MatrixInversionUI />;
        if (method === 'LU_Decomposition') return <LU_DecompositionUI />;
        if (method === 'Cholesky') return <CholeskyUI />;
        if (method === 'Jacobi') return <JacobiUI />;
        if (method === 'GaussSeidel') return <GaussSeidelUI />;
        if (method === 'ConjugateGradient') return <ConjugateGradientUI />;

        return <ComingSoon methodName={method} />;
    };

    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '32px',
        },
        formGroup: {
            marginBottom: '16px',
        },
        label: {
            display: 'block',
            fontSize: '20px',
            fontWeight: '900',
            marginBottom: '8px',
        },
        select: {
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            backgroundColor: 'white',
            color: '#333',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formGroup}>
                <label style={styles.label}> Problem Type: </label>
                <select 
                    value={problemType} 
                    onChange={handleProblemTypeChange}
                    style={styles.select}
                >
                    <option value=""> --- Select --- </option>
                    <option value="Root_of_Equation"> Root of Equation </option>
                    <option value="Linear_Algebra_Equations"> Linear Algebra Equations </option>
                    <option value="Test"> Test </option>
                </select>
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}> Method: </label>
                <select 
                    value={method} 
                    onChange={handleMethodChange}
                    style={styles.select}
                >
                    <option value=""> --- Select --- </option>
                    {problemTypes[problemType]?.map((methodOption) => (
                        <option key={methodOption.value} value={methodOption.value}>
                            {methodOption.label}
                        </option>
                    ))}
                </select>
            </div>

            {renderMethodComponent()}
        </div>
    );
}

export default Selector;