import produce from 'immer';

import { Action } from './actions';
import { INTERVAL, State } from './types';

//produce has to be wrapped with function to get draft and action?
export const data = (state: State, action: Action) => produce(state, (draft) => {
    switch (action.type) {
        case 'timer':
            if (!draft.pause) {
                draft.progress += INTERVAL;
            }
            break;
        case 'prev':
            draft.pause = false;
            draft.progress = 0;
            draft.index = Math.max(draft.index - 1, 0);
            break;
        case 'next':
            if (draft.index + 1 < draft.stories.length) {
                draft.index++;
                draft.progress = 0;
            } else {
                draft.pause = true;
            }

            break;
        case 'restart':
            draft.pause = false;
            draft.progress = 0;
            draft.index = 0;
            break;
        case 'update':
            const { alias, data } = action.data;

            if (alias) {
                draft.stories[0].alias = alias;
            }

            if (data) {
                Object.assign(draft.stories[draft.index].data, data);
            }

            break;
        case 'theme':
            draft.theme = action.theme;
            break;
    }
});

