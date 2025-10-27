// src/App.jsx
import Header from "./component/Header";
import Creator from "./component/Creator";
import Selector from "./component/Selector";

function App(){
  const styles = {   
    minHeight: "100vh",          
    backgroundColor: '#ffffff'  
  };

  return (                                    
    <div style={styles}>          
      <Header />
      <Selector />
      <Creator />
    </div>
  )
}

export default App;