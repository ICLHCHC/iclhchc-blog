import React from 'react';
import styles from './styles.module.css'; // 导入 CSS 模块

interface ToyHeroProps {
  title: string;
  description: string;
  buttonText: string;
}

const ToyHero = ({ title, description, buttonText }) => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroDescription}>{description}</p>
      <button className={styles.heroButton} onClick={() => {
    alert('按钮被点击了！');
  }}>
        {buttonText}
      </button>
    </div>
  );
};

export default ToyHero;
