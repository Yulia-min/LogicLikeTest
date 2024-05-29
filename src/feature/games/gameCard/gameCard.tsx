import { TProps } from "./type"

import './gameCard.scss'

export const GameCard = (props: TProps) => {
    const { game } = props

    const style = {
        display: 'flex',
        justifyContent: 'center',
        background: game.bgColor,
        borderRadius: '18px 18px 0 0'
    }

    return (
        <div className="gameCard" key={game.id}>
            <div style={style}>
                <img className="gameImage" src={game.image} alt={game.name} />
            </div>
            <div className="cardName">{game.name}</div>
        </div>
    )
}