



export default function Header(){
    return(
        <div className="Navheder">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">PC Solution</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Item</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Item Category</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Stock</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">User</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Order</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    )
}