import { isLit, Lit, Vec, vec2, vec3, vec4 } from '@thi.ng/shader-ast';
import { InputValue } from 'alma-graph';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useCircuit } from '../../../hooks/useCircuit/useCircuit';
import { Input } from '../../Input/Input';
import { BaseControl } from '../BaseControl/BaseControl';
import { vectorControlInputStyles, vectorControlNameStyles } from './VectorControl.styles';
import { IVectorControlProps } from './VectorControl.types';

const vectorLabels = ['x', 'y', 'z', 'w'];

export const VectorControl = observer(({ port }: IVectorControlProps) => {
    const circuit = useCircuit();
    const createOnChangeHandler = React.useCallback(
        (component: string) => {
            return (e: React.ChangeEvent<HTMLInputElement>) => {
                const portValue = port.node.resolveValue<Vec, InputValue<Vec>>(port.value);

                if (isLit(portValue)) {
                    let newVal: Lit<Vec> | undefined;

                    const vectorValues = portValue.val.map((literal: Lit<Vec>) => literal.val);
                    const indexToUpdate = vectorLabels.indexOf(component);

                    vectorValues[indexToUpdate] = e.target.valueAsNumber;

                    switch (portValue.type) {
                        case 'vec2':
                            newVal = vec2.apply(this, vectorValues);
                            break;
                        case 'vec3':
                            newVal = vec3.apply(this, vectorValues);
                            break;
                        case 'vec4':
                            newVal = vec4.apply(this, vectorValues);
                            break;
                    }

                    if (newVal) {
                        port.setValue(newVal);
                        circuit.context?.reset();
                    }
                }
            };
        },
        [port, circuit]
    );

    const disabled = React.useMemo(() => port.connected, [port.connected]);

    const resolvedValue = port.node.resolveValue(port.value);
    const components = isLit(resolvedValue) ? resolvedValue.val.map((lit: Lit<Vec>) => lit.val) : [];

    return (
        <BaseControl>
            <span className={vectorControlNameStyles}>{port.name}</span>
            {components.map((component: number, index: number) => (
                <Input
                    className={vectorControlInputStyles}
                    key={index}
                    placeholder={vectorLabels[index]}
                    onChange={createOnChangeHandler(vectorLabels[index])}
                    value={component}
                    type="number"
                    step={0.1}
                    disabled={disabled}
                />
            ))}
        </BaseControl>
    );
});
