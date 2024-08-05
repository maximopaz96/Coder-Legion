
import React from 'react';
import ConGener from '../Hooks/ConGener';

const GenreList = ({ queryParams }) => {
  const { genres, loading, error } = ConGener(queryParams);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {genres.map(genre => (
        <li key={genre.id}>
          <h3>{genre.name}</h3>
          <p>{genre.description}</p>
          <small>Created at: {new Date(genre.created_at).toLocaleDateString()}</small>
          <small>Updated at: {new Date(genre.updated_at).toLocaleDateString()}</small>
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
