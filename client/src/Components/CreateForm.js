import React, { useRef, useEffect } from 'react';

// NFT structure: name, price, url, status, user_id
// Only pass { name, url } to the backend
// user_id will be id of user who create this NFT
// Default: price: 0, status: false, 

const CreateForm = () => {
  const inputRef = useRef(null);

  // focus on first input field upon mounting
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <main id='createNFT'>
      <form className="form">
        <h1>Create New NFT</h1>
        <div className="form-control">
          <label htmlFor="name">Title</label>
          <input type="text" id='name' name='name' ref={inputRef}/>
        </div>
        <div className="form-control">
          <label htmlFor="url">Upload File</label>
          <input type="file" id='url' name='url' />
        </div>
        <button type='submit'>CREATE</button>
      </form>
    </main>
  )
}

export default CreateForm