import { useEffect, useState } from "react"
import axios from "axios"

import  { GameCard }  from "../gameCard"

import { TGamesList } from "../type"

import './gameList.scss'

export const GamesList = () => {
    const [selectedTag, setSelectedTag] = useState<string>("")
    const [gamesList, setGamesList] = useState<TGamesList[] | null>(null)

    useEffect(() => {
        axios.get('https://logiclike.com/docs/courses.json')
        .then((response) => {
            setGamesList(response.data)
        })
    }, [])
    
    const filterGamesByTag = (tag: string) => {
        setSelectedTag(tag)
    }

    const resetFilters = () => setSelectedTag("")

    const tags = Array.from(new Set(gamesList && gamesList.map((item) => item.tags).flat()))

    const filteredGamesList = selectedTag && gamesList
      ? gamesList.filter((game) => game.tags.includes(selectedTag))
      : gamesList
      
    
      return (
        <div className="container">
          <>
            <div className="tags">
              <div className="tag" onClick={resetFilters}>Все темы</div>
              {
                tags.map((tag) => 
                  <div className="tag" onClick={() => filterGamesByTag(tag)}>
                    {tag}
                  </div>)
              }
            </div>
          </>
          <div className="games">
            {
              filteredGamesList ? (
                  filteredGamesList.length ? (
                      filteredGamesList.map((game) => (
                        <GameCard game={game} />
                      ))
                  ) : <div className="emptyList">Ничего не найдено</div>
              ) : <div className="loading" />   
            }
          </div>
        </div>
      ) 
    }