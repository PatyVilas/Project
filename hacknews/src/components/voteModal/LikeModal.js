import axios from 'axios';
import useLog from '../../utils/hooks/useLog';

export default function LikeModal({ idEntry }) {
	const { token, idUser } = useLog();
	const vote = 0;

	const onSubmitVote = async (e) => {
		e.preventDefault();

		try {
			const response = await axios(
				`http://localhost:4000/entries/${idEntry}/votes`,
				{
					method: 'POST',
					headers: {
						Authorization: token,
					},
					data: { idUser, vote },
				}
			);
			const data = response.data;
			console.log(response);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='formComponent' onSubmit={onSubmitVote}>
			<form className='form'>
				<p>Tu voto ha sido enviado. Gacias por tu valoración.</p>
				<div>
					<input className='button--brown' type='submit' value='Ok' />
				</div>
			</form>
		</div>
	);
}
