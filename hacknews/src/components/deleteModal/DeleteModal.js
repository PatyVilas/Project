import axios from 'axios';
import useLog from '../../utils/hooks/useLog';

export default function DeleteModal({ entry, closeModal }) {
	const idEntry = entry.id;
	const { token } = useLog();

	function onSubmit(e) {
		e.preventDefault();

		const deleteEntry = async () => {
			try {
				const res = await axios(
					`http://localhost:4000/entries/${idEntry}`,
					{
						method: 'DELETE',
						headers: {
							Authorization: token,
						},
					}
				);
				const data = res.data;
				console.log(res);
				console.log(data);
			} catch (error) {
				throw new Error('The entry could not be deleted');
			}
		};

		deleteEntry();
		closeModal();
	}
	return (
		<div className='formComponent' onSubmit={onSubmit}>
			<form className='form'>
				<p>do you want to delete the entry?</p>
				<div>
					<input className='button--brown' type='submit' value='Ok' />
				</div>
			</form>
		</div>
	);
}
