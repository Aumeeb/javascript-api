import * as React from "react";
import * as ReactDOM from 'react-dom';
import Home from "./routes/home/home";
import Header from "./routes/components/header/header";
import Footer from "./routes/components/footer/footer";
import './app.less';
class App extends React.Component{
    render() {
        return (
            <div>
                <Header/>
                <Home  suffix='Xhome'  />
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react') as HTMLElement
);

