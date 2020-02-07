#!/usr/bin/env ruby

require 'matrix'
require 'securerandom'

class Simulation
  def initialize(world_width:, world_height:, agent_count:)
    @world = World.new(width: world_width, height: world_height)
    @agents = Array.new(agent_count) do
      start_location = Vector[rand(0...world_width), rand(0...world_height)]
      Agent.new(local_vicinity: world.local_vicinity(start_location))
    end
  end

  def run
    step_number = 0

    loop do
      print_state(step_number) if step_number % 500 == 0

      agents.each(&:step)

      if agents.all?(&:dead?)
        print_state(step_number)
        break
      end

      step_number += 1
    end
  end

  private

  attr_reader :world, :agents

  def print_state(step_number)
    puts "\n### step #{step_number} ###"

    food = world.send(:food_field).send(:field).flatten
    puts "world mean food ammount: #{food.inject(:+).to_f.round(3) / food.size }"

    agents.each { |agent| agent.print_state }
  end
end

class LocalVicinity
  def initialize(world:, location:)
    @world = world
    @location = location
  end

  def towards(direction, distance)
    world.local_vicinity(location, direction, distance)
  end

  def food_amount
    world.food_amount(location)
  end

  def withdraw_food(amount)
    world.withdraw_food(location, amount)
  end

  private

  attr_reader :world, :location
end

class World
  def initialize(width:, height:)
    @width = width
    @height = height
    @food_field = FoodField.new(width: width, height: height)
  end

  def local_vicinity(location, direction = Vector[0, 0], distance = 0)
    new_location = location + direction * distance

    # enforce world boundaries
    new_location[0] = [0.0, [new_location[0], width - 1].min].max
    new_location[1] = [0.0, [new_location[1], height - 1].min].max

    LocalVicinity.new(world: self, location: new_location)
  end

  def food_amount(location)
    unless (0...width).cover?(location[0]) && (0...height).cover?(location[1])
      return 0
    end

    food_field.at(location)
  end

  def withdraw_food(location, amount)
    food_field.withdraw(location, amount)
  end

  private

  attr_reader :width, :height, :food_field
end

class Agent
  HUNGER_PER_STEP = 0.05
  NUMBER_OF_SENSORS = 10
  RADIUS = 1
  SPEED_COEFFICIENT = 10

  def initialize(local_vicinity:)
    @id = SecureRandom.hex(4)
    @hunger = 0.0
    @state = :alive
    @local_vicinity = local_vicinity
  end

  def step
    return if dead?

    # check hunger
    @hunger += HUNGER_PER_STEP

    if hunger >= 1
      @state = :dead
      return
    end

    # feed
    if hunger > 0.5
      @hunger = [
        0,
        hunger - local_vicinity.withdraw_food(rand(0.5..1.0))
      ].max
    end

    # move
    direction = movement_direction(local_vicinity)
    speed = hunger**2 * SPEED_COEFFICIENT + 0.1

    @local_vicinity = local_vicinity.towards(direction, speed)
  end

  def print_state
    location = local_vicinity.send(:location)
    location_string = [location[0].round(3), location[1].round(3)].join(', ')

    puts [
      "Agent #{id}",
      "loc: #{location_string}",
      "hunger: #{hunger.round(4)}",
      ("dead" if dead?)
    ].compact.join(', ')
  end

  def dead?
    state == :dead
  end

  private

  attr_reader :id, :hunger, :local_vicinity, :state

  # 0 degrees is East (x: 1, y: 0), positive direction -- counterclockwise
  #
  def movement_direction(local_vicinity)
    step = (2 * Math::PI) / NUMBER_OF_SENSORS

    NUMBER_OF_SENSORS.times.map do |i|
      direction = to_rectangular_coords(i * step)
      direction += Vector[rand(-0.05..0.05), rand(-0.05..0.05)] # random noise
      direction * (local_vicinity.towards(direction, RADIUS).food_amount + rand(0.01..0.02))
    end.inject(:+).normalize
  end

  def to_rectangular_coords(angle, distance = 1.0)
    Vector[distance * Math.cos(angle), distance * Math.sin(angle)]
  end
end

class FoodField
  MAX_FOOD_PER_LOCATION = 10

  def initialize(width:, height:)
    @field = Array.new(width) { Array.new(height) { rand * MAX_FOOD_PER_LOCATION } }
  end

  attr_reader :field

  def at(location)
    field[location[0].round][location[1].round] || 0
  rescue
    puts location
    raise
  end


  def withdraw(location, amount)
    to_withdraw = [at(location), amount].min
    field[location[0].round][location[1].round] = at(location) - to_withdraw
    to_withdraw
  end
end

# simulation = Simulation.new(
#   world_width: 300,
#   world_height: 300,
#   agent_count: 5
# )

# simulation = Simulation.new(world_width: 100, world_height: 100, agent_count: 5).run
