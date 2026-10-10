"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { FavoriteMovie } from "../lib/type";

type FavoritesContextType = {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: FavoriteMovie) => void;
};

const FavoritesContext = createContext<
FavoritesContextType | undefined
>(undefined);

export function FavoritesProvider({ children,}: { children: ReactNode;}) {
  const [favorites, setFavorites] = useState< FavoriteMovie[] >([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    setFavorites(storedFavorites);
  }, []);

  function toggleFavorite(movie: FavoriteMovie) {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (item) => item.id === movie.id
      );

      const updatedFavorites = isFavorite
        ? currentFavorites.filter(
            (item) => item.id !== movie.id
          )
        : [...currentFavorites, movie];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}