export class StatelessIterator<T> {
	public readonly value: T | null
	constructor(
		protected readonly _arrayLike: ArrayLike<T>,
		public readonly index: number,
	) {
		this.value = _arrayLike[index] ?? null
	}
	public next() {
		return this.nextNTimes(1)
	}
	public nextNTimes(n: number) {
		return new StatelessIterator(this._arrayLike, this.index + n)
	}
	public nextWhile(condition: (item: T) => boolean, reducer: (acc: T, curr: T) => T) {
		let values = this.value!
		let count = 1
		{
			const offset = this.index
			for (
				let item: T;
				item = this._arrayLike[offset + count], item !== null && condition(item);
				count++
			) values = reducer(values, item)!
		}

		return {
			iterator: this.nextNTimes(count),
			values,
		}
	}
}
