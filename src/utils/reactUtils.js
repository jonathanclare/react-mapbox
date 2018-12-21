/*
Normally used in componentDidUpdate() to update any state values that are set from passed in prop values that have chnnged.
Compares the 'state' object with the 'props' object for those properties listed in 'arrPropsToUpdate'.
Returns a new object containing the state properties that have changed.
The returned object can subsequently be used to update the state.

const newState = updateStateFromProps(['id', 'url', 'version'], this.state, this.props);
if (newState !== null) this.setState(newState);
*/
export const updateStateFromProps = (arrPropsToUpdate, state, props) =>
{
    return arrPropsToUpdate.reduce((accumulator, currentValue) => 
    {
        if (props[currentValue] !== state[currentValue]) 
        {
            if (accumulator === null) accumulator = {}; 
            accumulator[currentValue] = props[currentValue];
        }
        return accumulator;
    }, null);
}