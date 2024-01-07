import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { setUUID } from '@src/redux/actions/session';

export const StartupContainer = () => {
  const dispatch = useDispatch();
  const { uuid } = useSelector((state) => state.sessionReducer);

  useEffect(() => {
    let temp_uuid = setUUID(v4());
    if (uuid === undefined || uuid === '') {
      dispatch(temp_uuid);
    }
  }, [dispatch, uuid]);
};
