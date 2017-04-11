import * as React from 'react';
import {i18n} from '../../../services/i18n';

interface HeaderCol {
    title: React.ReactNode;
    alignElement?: React.ReactNode;
    classNames?: string;
}

export interface TablePropsData {
    className: string,
    cols: React.ReactNode[]
    onClick?: (e: React.MouseEvent<{}>) => void;
}
interface TableProps {
    data: TablePropsData[];
    captionLeft?: React.ReactNode;
    captionRight?: React.ReactNode;
    headerImage?: string;
    headerImageNode?: React.ReactNode;
    headerTitle?: React.ReactNode;
    headerSubTitle?: React.ReactNode;
    headerMenu?: React.ReactNode;
    headerCols?: HeaderCol[];
    emptyMessage?: React.ReactNode;
}

interface TableState {}

export class Table extends React.Component<TableProps, TableState> {
    render() {
        const defaultEmptyText = i18n().any_data_not_found;
        const {captionLeft, captionRight, data, headerCols, headerImage, headerImageNode, headerSubTitle, headerMenu, headerTitle, emptyMessage = defaultEmptyText} = this.props;
        return (
            <div className="table">
                {(captionLeft || captionRight)
                    ? <div className="table__caption">
                        {captionLeft && <span className="table__caption-left">{captionLeft}</span>}
                        {captionRight && <span className="table__caption-right">{captionRight}</span>}
                    </div>
                    : null
                }
                <div className='table__head'>
                    {(headerImage || headerImageNode) &&
                    <div className="table__flag">
                        {headerImageNode || <img className="table__flag-img" src={headerImage} alt="flag"/>}
                    </div>
                    }
                    {(headerTitle || headerSubTitle || headerMenu) &&
                    <div className='table__head-text'>
                        {(headerTitle || headerSubTitle) &&
                        <div className='table__titles'>
                            {headerTitle && <div className="table__title">{headerTitle}</div>}
                            {headerSubTitle && <div className="table__sub-title">{headerSubTitle}</div>}
                        </div>
                        }
                        {headerMenu && <div className="table__menu">{headerMenu}</div>}
                    </div>
                    }
                </div>
                <div className='table__header'>
                    {headerCols.map((col, i) =>
                        <div key={i} className={col.classNames}>
                            {col.title}
                        </div>
                    )}
                </div>
                <div className="table__body">
                    {data.map((row, i) =>
                        <div className={'table__row ' + row.className} onClick={row.onClick} key={i}>
                            {row.cols.map((item, j) =>
                                <div key={j} className={headerCols[j].classNames}>{item}</div>
                            )}
                        </div>
                    )}
                </div>
                {data.length == 0 && <div className="table__message">{emptyMessage}</div>}
            </div>
        );
    }
}
