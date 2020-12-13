import './App.css';
import DefaultHeader from './components/DefaultHeader'
import StateWrapperComponent from './components/StateWrapperComponent'

function App() {
  return (
    <div className="App">
      <DefaultHeader 
        text='Wikipedia-Finder'
      />
      <StateWrapperComponent />
    </div>
  );
}

export default App;
