import axios from 'axios';
import { useState } from 'react';
import useLog from '../../utils/hooks/useLog';
import Add from '../../assets/img//addImg.svg';
import { useParams } from 'react-router';

function AddPhoto() {
	const [photo1, setPhoto1] = useState(null);
	const [photo2, setPhoto2] = useState(null);
	const [photo3, setPhoto3] = useState(null);
	const { token } = useLog();
	const { idEntry } = useParams();

	const photos = [photo1, photo2, photo3].filter((photo) => photo !== null);

	for (const photo of photos) {
		const payload = new FormData();
		payload.append('photo', photo);

		axios(`http://localhost:4000/entries/${idEntry}/photos`, {
			method: 'POST',
			headers: {
				Authorization: token,
			},
			data: payload,
		});
	}

	return (
		<div className='photo-list'>
			<div>
				<label>
					<img
						className='addIcon'
						src={photo1 ? URL.createObjectURL(photo1) : Add}
						alt='add'
					/>
					<input
						type='file'
						accept='.jpg,.png,.wepb,.gif'
						className='photo-input'
						onChange={(e) => {
							setPhoto1(e.target.files[0]);
						}}
					/>
				</label>
				{photo1 ? (
					<button
						className='entryButton'
						onClick={() => setPhoto1(null)}>
						Delete photo
					</button>
				) : null}
			</div>
			<div>
				<label>
					<img
						className='addIcon'
						src={photo2 ? URL.createObjectURL(photo2) : Add}
						alt='add'
					/>
					<input
						type='file'
						accept='.jpg,.png,.wepb,.gif'
						className='photo-input'
						onChange={(e) => {
							setPhoto2(e.target.files[0]);
						}}
					/>
				</label>
				{photo2 ? (
					<button
						className='entryButton'
						onClick={() => setPhoto2(null)}>
						Delete photo
					</button>
				) : null}
			</div>
			<div>
				<label>
					<img
						className='addIcon'
						src={photo3 ? URL.createObjectURL(photo3) : Add}
						alt='add'
					/>
					<input
						type='file'
						accept='.jpg,.png,.wepb,.gif'
						className='photo-input'
						onChange={(e) => {
							setPhoto3(e.target.files[0]);
						}}
					/>
				</label>
				{photo3 ? (
					<button
						className='entryButton'
						onClick={() => setPhoto3(null)}>
						Delete photo
					</button>
				) : null}
			</div>
		</div>
	);
}

export default AddPhoto;
