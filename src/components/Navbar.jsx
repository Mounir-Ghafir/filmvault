import { Plus, Clapperboard } from 'lucide-react';

function Navbar({ onAddClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Clapperboard className="logo-icon" />
        <span className="logo-text">Film<span>Vault</span></span>
      </div>
      <button className="add-movie-btn" onClick={onAddClick}>
        <Plus size={20} />
        <span>Add Movie</span>
      </button>
    </nav>
  );
}

export default Navbar;
