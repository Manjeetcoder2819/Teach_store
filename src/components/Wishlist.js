const Wishlist = ({ wishlist }) => {
  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlist.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
