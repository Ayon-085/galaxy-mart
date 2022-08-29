import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SearchScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search); // /search?category=Shirts
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;
  

  return (
    <>
    
    
    </>
  )
}

export default SearchScreen