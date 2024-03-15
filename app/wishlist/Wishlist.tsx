"use client";

import styles from "./Wishlist.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constant";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<{ id: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_URL}/wishlist`).then((response) => {
        const data = response.data;
        setWishlist(data);
      });
    };
    fetchData();
  }, []);
  return (
    <div className={styles.wishlist}>
      <h2 className={styles.header}>
        Wishlist {wishlist.length !== 0 ? `(${wishlist.length})` : null}
      </h2>
    </div>
  );
}
