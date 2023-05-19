import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [nome, setNome] = useState('')
  const [autora, setAutora] = useState('')
  const [categoria, setCategoria] = useState('')
  const [imagem, setImagem] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://back-end-livros.onrender.com/livros'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueAutora(event) {
    setminibio(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleInputValueCategoria(event) {
    setCitacao(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', nome, autora, categoria, imagem)

    async function sendData() {
      await Axios.post(baseURL, {
        nome: nome,
        autora: autora,
        categoria: categoria,
        imagem: imagem
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setNome('')
    setAutora('')
    setImagem('')
    setCategoria('')
  }

  return (
    <>
      <Header
        title='{ Mulheres Inspiradoras Escrevem }'
        subtitle='Conheça os livros de escritoras maravilhosas, que vão mudar sua vida!!'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.imagem} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.nome}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.autora}</p>
                  <q className={styles.cardRepoQuote}>{repo.categoria}</q>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Cadastre um livro de uma autora inspiradora:</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <textarea 
            onChange={handleInputValueNome} 
            placeholder="Digite o nome do livro"
            value={nome}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueImagem} 
            placeholder="Digite o link da imagem"
            value={imagem}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueAutora} 
            placeholder="Digite a autora"
            value={autora}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueCategoria} 
            placeholder="Digite a categoria"
            value={categoria}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar mensagem</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}
