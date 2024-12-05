import './Loader.css';

export function Loader(): JSX.Element {
    return (
        <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};